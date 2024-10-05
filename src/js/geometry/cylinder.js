import {
    CylinderGeometry,
    Mesh,
    MeshBasicMaterial,
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
    ArrowHelper,
    Vector3,
    Matrix4,
    CanvasTexture,
    SpriteMaterial,
    Sprite,
    BufferAttribute,
  } from "three";
  import { DashedLine } from "./tool/line";
  import { reactive } from "vue";
  
  class Cylinder {
    constructor() {
      this.geometry = new CylinderGeometry(2, 2, 3, 20); // 初始: 顶部半径 2, 底部半径 2, 高度 4
      this.material = new MeshBasicMaterial({
        color: "#BAE3A8",
        transparent: true,
        opacity: 0.3,
      });
      this.cylinder = new Mesh(this.geometry, this.material);
  
      // 创建边框
      const edges = new EdgesGeometry(this.geometry);
      const dashedMaterial = new LineBasicMaterial({
        color: '#DCDFE6',
      });
      this.dashedEdges = new LineSegments(edges, dashedMaterial);
      this.cylinder.add(this.dashedEdges);
  
      // 自动旋转
      this.animationFrameId = null;
      // 正箭头
      this.arrow = null;
  
      // 线标签Map
      this.vertexLabels = new Map();
      // sprites标签Map
      this.sprites = new Map();
      // this.addVertexLabels();
      this.line = new DashedLine(this.cylinder);
      this.stateContext = reactive({
        isRender: false,
      });
    }
  
    // Method to modify the top radius
    setTopRadius(topRadius) {
      this.geometry.parameters.radiusTop = topRadius;
      this.updateGeometry();
    }
  
    // Method to modify the bottom radius
    setBottomRadius(bottomRadius) {
      this.geometry.parameters.radiusBottom = bottomRadius;
      this.updateGeometry();
    }
  
    // Method to modify the height
    setHeight(height) {
      this.geometry.parameters.height = height;
      this.updateGeometry();
    }
  
    // Method to modify the color
    setColor(color) {
      this.material.color.set(color);
    }
  
    // Helper method to update geometry
    updateGeometry() {
      this.geometry = new CylinderGeometry(
        this.geometry.parameters.radiusTop,
        this.geometry.parameters.radiusBottom,
        this.geometry.parameters.height,
        32
      );
      this.cylinder.geometry = this.geometry;
  
      // 更新边框
      const edges = new EdgesGeometry(this.geometry);
      this.dashedEdges.geometry.dispose();
      this.dashedEdges.geometry = edges;
    }
  
    // Method to get the cylinder mesh
    getMesh() {
      return this.cylinder;
    }
  
    // Automatic rotation
    animate() {
      this.cylinder.rotation.x += 0.01;
      this.cylinder.rotation.y += 0.01;
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
        this.cylinder.remove(this.arrow);
      }
      const direction = new Vector3(0, 0, -1);
      const origin = new Vector3(0, 0, this.geometry.parameters.height / 2+2);
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
      this.cylinder.add(this.arrow);
    }
  
    removeFrontArrow() {
      if (this.arrow) {
        this.cylinder.remove(this.arrow);
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
      for (let i = 0; i < vertices.length; i++) {
        let obj = this.sprites.get(vertexNames[i]);
        let label = obj ? obj.sprite : null;
        if (obj) {
          obj.length += 1;
          obj.sprite.position.copy(vertices[i]);
        } else {
          label = this.createTextSprite(vertexNames[i]);
          label.position.copy(vertices[i]);
          obj = {
            length: 1,
            sprite: label,
          };
          this.cylinder.add(label);
        }
        const matrix = new Matrix4();
        matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        label.applyMatrix4(matrix);
        this.sprites.set(vertexNames[i], obj);
  
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
  
      canvas.width = 256;
      canvas.height = 128;
      context.font = `${fontSize}px Arial`;
      context.fillStyle = "black";
      context.fillText(text, 20, fontSize);
  
      const texture = new CanvasTexture(canvas);
      const spriteMaterial = new SpriteMaterial({ map: texture });
      const sprite = new Sprite(spriteMaterial);
      sprite.scale.set(1, 1, 1);
  
      return sprite;
    }
  
    removeVertexLabels(id) {
      this.vertexLabels.delete(id);
      let arr = id.split("");
      for (let i = 0; i < arr.length; i++) {
        let obj = this.sprites.get(arr[i]);
        if (obj) {
          obj.length -= 1;
          if (obj.length === 0) {
            this.cylinder.remove(obj.sprite);
            this.sprites.delete(arr[i]);
          }
        }
      }
    }
  }
  
  export { Cylinder };
  