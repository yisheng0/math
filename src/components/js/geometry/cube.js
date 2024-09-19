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
} from "three";

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
    // console.log(this.cube)
    this.drawDashedLine();
    // 自动旋转
    this.animationFrameId = null;
    // 正箭头
    this.arrow = null;

    // 创建八个顶点的标签
    this.vertexLabels = [];
    this.addVertexLabels();
  }

  // Method to modify the width
  setWidth(width) {
    this.geometry.parameters.width = width;
    this.updateGeometry();
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
    this.geometry = new BoxGeometry(
      this.geometry.parameters.width,
      this.geometry.parameters.height,
      this.geometry.parameters.depth
    );
    this.cube.geometry = this.geometry;
    const edges = new EdgesGeometry(this.geometry);
    this.dashedEdges.geometry.dispose();
    this.dashedEdges.geometry = edges;
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

  drawDashedLine() {
    // 计算立方体的左下角
    const halfWidth = this.geometry.parameters.width / 2;
    const halfHeight = this.geometry.parameters.height / 2;
    const halfDepth = this.geometry.parameters.depth / 2;
    let point1 = new Vector3(0, 0, 0);
    let point2 = new Vector3(2, 4, 0);

    const geometry = new BufferGeometry().setFromPoints([point1, point2]);
    const material = new LineDashedMaterial({
      color: 0x000000,
      dashSize: 0.5,
      gapSize: 0.2,
    });

    // 创建线条并添加到立方体
    const line = new Line(geometry, material);
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
    this.cube.add(line);
  }

  addVertexLabels() {
    const vertexNames = ["A1", "A", "B1", "B", "C1", "C", "D1", "D"];
    const vertices = [
      new Vector3(-2.3, 2.3, 2.3), // A1
      new Vector3(2, 2, 2), // A
      new Vector3(2.3, -2.3, 2.3), // B1
      new Vector3(-2, -2, 2), // B
      new Vector3(-2, 2, -2), // C1
      new Vector3(2, 2, -2), // C
      new Vector3(2.3, -2.3, -2.3), // D1
      new Vector3(-2, -2, -2), // D
    ];

    for (let i = 0; i < vertices.length; i++) {
      const label = this.createTextSprite(vertexNames[i]);
      label.position.copy(vertices[i]);
      this.cube.add(label);
      this.vertexLabels.push(label);
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

    return sprite;
  }
}

export { Cube };
