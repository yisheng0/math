import * as resize from "./system/resize"
import * as THREE from "three"
import { createCamera } from "./base/camera"
import { createScene } from "./base/scene"
import { Cube } from "./geometry/cube"
import { createRenderer } from "./base/renderer"
import { createControl } from "./base/control"
import addLight from "./base/light"


class ThreeApp {
    constructor(container) {
        console.log("场景初始化")
        this.container = container
        this.sizes = { width: 0, height: 0 };
        const canvas = document.querySelector('canvas');
        this.sizes.width = canvas.clientWidth;
        this.sizes.height = canvas.clientHeight;
        this.init()
    }
    init(){
        // 相机 camera
        this.camera = createCamera(this.sizes)
        // 控制器
        this.control = createControl(this.camera, this.container)
        // 场景 scene
        this.scene = createScene()
        // 光源
        addLight(this.scene)
        // 渲染器 renderer
        this.renderer = createRenderer(this.container,this.sizes)
        resize.resizeEventListener(this.camera, this.renderer)
    }
    render() {
        // 渲染场景
        console.log("渲染场景...")
        this.tick = () => {
            this.renderer.render(this.scene, this.camera)
            window.requestAnimationFrame(this.tick)
        }
        this.tick()
    }
    clear() {
        console.log("清理内存")
        location.reload()
        resize.clear()
        this.tick = null
        this.scene = null
        this.camera = null
        this.renderer.dispose()
        this.control.dispose()
    }
}

export { ThreeApp }