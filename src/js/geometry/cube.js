import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  ArrowHelper,
  Vector3,
  EdgesGeometry,
  LineDashedMaterial,
  LineSegments,
  LineBasicMaterial,
  Line,
  BufferGeometry,
  Matrix4,
  SpriteMaterial,
  Sprite,
  CanvasTexture,
  BufferAttribute,
} from "three";
import { DashedLine } from "./tool/line";
import { reactive } from "vue";
import { it } from "element-plus/es/locales.mjs";

class Cube {
  constructor() {
    this.geometry = new BoxGeometry(4, 4, 4);
    this.material = new MeshBasicMaterial({
      color: "#BAE3A8",
      transparent: true,
      opacity: 0.3,
    });
    this.cube = new Mesh(this.geometry, this.material);

    // 创建边框
    const edges = new EdgesGeometry(this.geometry);
    const dashedMaterial = new LineBasicMaterial({
      color: 0x000000,
    });
    this.dashedEdges = new LineSegments(edges, dashedMaterial);
    this.cube.add(this.dashedEdges);
    // 自动旋转
    this.animationFrameId = null;
    // 正箭头
    this.arrow = null;

    // 创建八个顶点的标签
    this.vertexLabels = new Map();
    // this.addVertexLabels();
    this.line = new DashedLine(this.cube);
    this.stateContext = reactive({
      isRender: false,
    });
  }

  // Method to modify the width
  setWidth(width) {
    this.geometry.parameters.width = width;
    this.updateGeometry();
    this.stateContext.isRender = true;
  }

  // Method to modify the height
  setHeight(height) {
    this.geometry.parameters.height = height;
    this.updateGeometry();
  }

  // Method to modify the depth
  setDepth(depth) {
    this.geometry.parameters.depth = depth;
    this.updateGeometry();
  }

  // Method to modify the color
  setColor(color) {
    this.material.color.set(color);
  }

  // Helper method to update geometry
  updateGeometry() {
    // cube
    this.geometry = new BoxGeometry(
      this.geometry.parameters.width,
      this.geometry.parameters.height,
      this.geometry.parameters.depth
    );
    this.cube.geometry = this.geometry;
    // 边框更新
    let indexMap = {
      0: this.geometry.parameters.width,
      1: this.geometry.parameters.height,
      2: this.geometry.parameters.depth,
    };
    const edges = new EdgesGeometry(this.geometry);
    this.dashedEdges.geometry.dispose();
    this.dashedEdges.geometry = edges;
    // 虚线
    let arr = this.line.pObject.filter((item) => item.isLock !== false);
    for (let item of arr) {
      let line = this.line.lineMap.get(item.id);
      let P1 = item.P1.split(",").map(Number);
      let P2 = item.P2.split(",").map(Number);
      if (item.isLock[0].length > 0) {
        for (let index of item.isLock[0]) {
        }
      }
      if (item.isLock[1].length > 0) {
        for (let index of item.isLock[1]) {
          P2[index] = indexMap[index];
        }
      }
      item.P1 = P1.join(",");
      item.P2 = P2.join(",");
      // 方法二 矩阵变换实现，性能更好
      // const positions = new Float32Array([
      //  ...P1,
      //  ...P2,
      // ]);
      // line.geometry.dispose();
      // line.geometry.setAttribute(
      //   "position",
      //   new BufferAttribute(positions, 3)
      // );

      // line.geometry.attributes.position.needsUpdate = true; // 标记为需要更新
      this.cube.remove(line);
      this.removeVertexLabels(item.id);
      this.drawDashedLine(P1, P2, item.id);
    }
  }

  // Method to get the cube mesh
  getMesh() {
    return this.cube;
  }
  // Automatic rotation
  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  stopAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animateRotation(bool) {
    if (bool) {
      this.animate();
    } else {
      this.stopAnimation();
    }
  }

  addFrontArrow() {
    if (this.arrow) {
      this.cube.remove(this.arrow);
    }
    const direction = new Vector3(0, 0, -1);
    const origin = new Vector3(0, 0, this.geometry.parameters.depth);
    const length = 1;
    const color = "#001529";
    const headLength = 0.1;
    const headWidth = 0.2;
    this.arrow = new ArrowHelper(
      direction,
      origin,
      length,
      color,
      headWidth,
      headLength
    );
    this.cube.add(this.arrow);
  }

  removeFrontArrow() {
    if (this.arrow) {
      this.cube.remove(this.arrow);
    }
  }

  drawDashedLine(p1, p2, id) {
    this.line.drawDashedLine(p1, p2, id);
    let vertexNames = id.split("");
    let vertices = [
      new Vector3(p1[0], p1[1] + 0.5, p1[2]),
      new Vector3(p2[0], p2[1] + 0.5, p2[2]),
    ];
    this.addVertexLabels(vertexNames, vertices);
  }

  // label
  addVertexLabels(vertexNames, vertices) {
    // const vertexNames = ["A1", "A", "B1", "B", "C1", "C", "D1", "D"];
    // const vertices = [
    //   new Vector3(-2.3, 2.3, 2.3), // A1
    //   new Vector3(2, 2, 2), // A
    //   new Vector3(2.3, -2.3, 2.3), // B1
    //   new Vector3(-2, -2, 2), // B
    //   new Vector3(-2, 2, -2), // C1
    //   new Vector3(2, 2, -2), // C
    //   new Vector3(2.3, -2.3, -2.3), // D1
    //   new Vector3(-2, -2, -2), // D
    // ];

    for (let i = 0; i < vertices.length; i++) {
      const label = this.createTextSprite(vertexNames[i]);
      label.position.copy(vertices[i]);
      const halfWidth = this.cube.geometry.parameters.width / 2;
      const halfHeight = this.cube.geometry.parameters.height / 2;
      const halfDepth = this.cube.geometry.parameters.depth / 2;
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
      label.applyMatrix4(matrix);
      this.cube.add(label);
      let labels = this.vertexLabels.get(vertexNames.join(""));
      if (!labels) {
        labels = [];
      }
      labels.push(label);
      this.vertexLabels.set(vertexNames.join(""), labels);
    }
  }

  // Helper function to create a text sprite
  createTextSprite(text) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const fontSize = 90;

    // 设置画布大小和字体样式
    canvas.width = 256;
    canvas.height = 128;
    context.font = `${fontSize}px Arial`;
    context.fillStyle = "black";
    context.fillText(text, 20, fontSize);

    // 使用 Canvas 生成纹理
    const texture = new CanvasTexture(canvas);
    const spriteMaterial = new SpriteMaterial({ map: texture });
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(1, 1, 1); // 调整标签大小

    // sprite.lookAt(camera.position);
    return sprite;
  }

  removeVertexLabels(id) {
    let label = this.vertexLabels.get(id);
    if (label.length > 0) {
      for (let item of label) {
        this.cube.remove(item);
      }
      this.vertexLabels.delete(id);
    }
  }
}

export { Cube };
