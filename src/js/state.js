import { inject, provide } from "vue";
import { Cube, Interactive, Cylinder } from "./geometry";
const stateSymbol = Symbol("object3D");

export function injectObject3D() {
  const state = inject(stateSymbol);
  // if (!state) {
  //   throw new Error("useObject3D() is called without provider.");
  // }
  return state;
}
export function provideObject3D(shape) {
  let state = null
  if(shape === 'rectangle') {
    state = new Cube();
  }
  else if(shape === 'cylinder'){
    state = new Cylinder();
  } else {
    state = new Cube();
  }
  provide(stateSymbol, state);
}
