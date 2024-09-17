import { BoxGeometry, Mesh, MeshStandardMaterial, MeshBasicMaterial } from 'three';

function createCube() {

  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({
    color:"#BAE3A8",
    transparent: true,
    opacity: 0.5
  });
  const cube = new Mesh(geometry, material);
  return cube;
}

export { createCube };
