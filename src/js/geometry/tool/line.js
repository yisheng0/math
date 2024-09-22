import {
  LineDashedMaterial,
  Line,
  Vector3,
  Matrix4,
  BufferGeometry,
} from "three";
import { reactive } from "vue";
class DashedLine {
  constructor(cube) {
    this.pObject = reactive([
      {
          id: "BC",
          P1: "0.0, 0.0, 0.0",
          P2: "2.5, 4.0, 0.0",
          isLock: false,
      },
  ])
    this.lineMap = new Map();
    this.lockLine = {};
    this.cube = cube;
    this.line = null;
  }
  drawDashedLine(p1, p2, id) {
    if(this.lineMap.has(id)){
      this.cancelDashedLine(id);
    }
    // 计算立方体的左下角
    const halfWidth = this.cube.geometry.parameters.width / 2;
    const halfHeight = this.cube.geometry.parameters.height / 2;
    const halfDepth = this.cube.geometry.parameters.depth / 2;
    let point1 = new Vector3(...p1);
    let point2 = new Vector3(...p2);

    const geometry = new BufferGeometry().setFromPoints([point1, point2]);
    const material = new LineDashedMaterial({
      color: 0x000000,
      dashSize: 0.5,
      gapSize: 0.2,
    });

    // 创建线条并添加到立方体
    let line = new Line(geometry, material);
    line.computeLineDistances();
    const matrix = new Matrix4();
    matrix.set(
      1,
      0,
      0,
      -halfWidth,
      0,
      1,
      0,
      -halfHeight,
      0,
      0,
      1,
      -halfDepth,
      0,
      0,
      0,
      1
    );

    // 应用矩阵到线条对象上
    line.applyMatrix4(matrix);
    console.log(id);
    this.lineMap.set(id, line);
    this.cube.add(line);
  }
  updatedDashedLine() {
    const positions = new Float32Array([
      point1.x,
      point1.y,
      point1.z,
      point2.x,
      point2.y,
      point2.z,
    ]);
    this.line.geometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );
    this.line.geometry.attributes.position.needsUpdate = true; // 标记为需要更新
  }
  getDashLine() {
    return this.line;
  }
  cancelDashedLine(id) {
    const line = this.lineMap.get(id);
    if (line) {
      this.cube.remove(line);
      this.lineMap.delete(id);
    }
  }
}
export { DashedLine };
