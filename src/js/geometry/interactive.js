import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  GridHelper,
  BoxGeometry,
  Vector2,
  Raycaster,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
} from "three";

const rollOverGeo = new BoxGeometry(1, 1, 1);
const rollOverMaterial = new MeshBasicMaterial({
  color: 0xff0000,
  opacity: 0.5,
  transparent: true,
});
const rollOverMesh = new Mesh(rollOverGeo, rollOverMaterial);
//
const cubeGeo = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({
  color: "#4175E4",
  // transparent: true,
  // opacity: 0.7,
});
const dashedMaterial = new LineBasicMaterial({
  color: "#333333",
});

class Interactive {
  rollOverMesh = rollOverMesh;
  pointer = new Vector2();
  raycaster = new Raycaster();
  objects = [];
  constructor(threeApp) {
    const geometry = new PlaneGeometry(10, 10);
    geometry.rotateX(-Math.PI / 2);
    this.plane = new Mesh(geometry, new MeshBasicMaterial({ visible: false }));
    this.objects.push(this.plane);
    this.threeApp = threeApp;
    this.gridHelper = new GridHelper(10, 10);
    // this.gridHelper.position.y = -0.5;
  }
  onPointerMove(event) {
    const canvasRect =
      this.threeApp.renderer.domElement.getBoundingClientRect();
    const canvasX = event.clientX - canvasRect.left;
    const canvasY = event.clientY - canvasRect.top;
    // 归一化坐标
    this.pointer.set(
      (canvasX / canvasRect.width) * 2 - 1,
      -(canvasY / canvasRect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.threeApp.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, false);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      const gridSize = 1;
      const pos = intersect.point.clone();

      pos.x = Math.floor(pos.x / gridSize) * gridSize + gridSize / 2;
      pos.z = Math.floor(pos.z / gridSize) * gridSize + gridSize / 2;
      pos.y = Math.floor(pos.y / gridSize) * gridSize + gridSize / 2;
      if (pos.y < 0) {
        pos.y = 0.5;
      }
      this.rollOverMesh.position.set(pos.x, pos.y, pos.z);
    }
  }

  onPointerDown(event, isShiftDown) {
    const canvasRect =
      this.threeApp.renderer.domElement.getBoundingClientRect();
    const canvasX = event.clientX - canvasRect.left;
    const canvasY = event.clientY - canvasRect.top;
    // 归一化坐标
    this.pointer.set(
      (canvasX / canvasRect.width) * 2 - 1,
      -(canvasY / canvasRect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.pointer, this.threeApp.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, false);
    if (intersects.length > 0) {
      const intersect = intersects[0];

      // delete cube
      if (isShiftDown) {
        if (intersect.object !== this.plane) {
          this.plane.remove(intersect.object);
          this.objects.splice(objects.indexOf(intersect.object), 1);
        }
      } else {
        const gridSize = 1;
        const pos = intersect.point.clone();
        pos.x = Math.floor(pos.x / gridSize) * gridSize + gridSize / 2;
        pos.z = Math.floor(pos.z / gridSize) * gridSize + gridSize / 2;
        pos.y = Math.floor(pos.y / gridSize) * gridSize + gridSize / 2;
        if (pos.y < 0) {
          pos.y = 0.5;
        }
        // create cube
        const voxel = new Mesh(cubeGeo, cubeMaterial);
        voxel.position.copy(intersect.point).add(intersect.face.normal);
        voxel.position.set(pos.x, pos.y, pos.z);
        const edges = new EdgesGeometry(voxel.geometry);
        const dashedEdges = new LineSegments(edges, dashedMaterial);
        voxel.add(dashedEdges);
        this.plane.add(voxel);
        this.objects.push(voxel);
      }
    }
  }
}
export { Interactive };
