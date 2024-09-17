import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
export function createControl(camera, canvas) {
    const control = new OrbitControls(camera, canvas)
    control.minDistance = 4
    control.target.set(0, 0, 0)
    control.enableDamping = true
    control.dampingFactor = 0.1
    return control
}