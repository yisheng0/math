import { PerspectiveCamera,Vector3 } from "three";
function createCamera(sizes){
    const camera = new PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 1000)
    camera.rotation.order = 'YXZ'
    camera.position.copy(new Vector3(0,10,10))
    camera.lookAt(0,1,0)
    return camera
}
export {createCamera }