import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

class Cube {
  constructor() {
    this.geometry = new BoxGeometry(4, 4, 4);
    this.material = new MeshStandardMaterial({
      color: "#BAE3A8",
      transparent: true,
      opacity: 0.3,
    });
    this.cube = new Mesh(this.geometry, this.material);
    this.animationFrameId = null;
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

  // Method to get the cube mesh
  getMesh() {
    return this.cube;
  }
}

export { Cube };
