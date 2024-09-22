import { Color, Scene, Fog } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color("#FAFAFA");
	scene.fog = new Fog( 0x88ccee, 0, 50 );

  return scene;
}

export { createScene };