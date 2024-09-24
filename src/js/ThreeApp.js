import * as resize from "./system/resize"
import {PerspectiveCamera,Vector3,Box3} from "three"
import { createCamera } from "./base/camera"
import { createScene } from "./base/scene"
import { Cube } from "./geometry/cube"
import { createRenderer } from "./base/renderer"
import { createControl } from "./base/control"
import addLight from "./base/light"


class ThreeApp {
    // 依赖控制
    // this.Object3D = null
    // constructor(container,thing) 
    // this.Object3D = new thing(this)
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
    takeSnapshot(position){
        // console.log(...position)
        let shotCamera = new PerspectiveCamera(30, this.sizes.width / this.sizes.height, 0.3, 100)
        shotCamera.position.set(...position)
        shotCamera.lookAt(0,0,0)
        this.renderer.render(this.scene, shotCamera);
        return this.renderer.domElement.toDataURL("image/png");
    }
    renderThreeViewsForObjects(objects) {
        // this.resetPerspective()
        const boundingBox = new Box3();
    
        // 计算所有物体的包围盒
        objects.forEach((obj) => {
            boundingBox.expandByObject(obj);
        });
    
        // 获取包围盒的中心点和大小
        const center = new Vector3();
        boundingBox.getCenter(center); // 获取中心
        const size = new Vector3();
        boundingBox.getSize(size); // 获取包围盒的尺寸
    
        // 动态计算相机距离，确保所有物体都能被完整渲染
        const distanceMultiplier = 6.5; 
        const maxDim = Math.max(size.x, size.y, size.z); 
        const cameraDistance = maxDim * distanceMultiplier; 
    
        // 定义三视图的相机位置
        const views = {
            front: { position: [center.x, center.y, center.z + cameraDistance], fov: 50 },  // 前视图
            top: { position: [center.x, center.y + cameraDistance, center.z], fov: 50 },    // 俯视图
            side: { position: [center.x + cameraDistance, center.y, center.z], fov: 50 },   // 侧视图
        };
        let arr  = []
        // 渲染三视图
        Object.keys(views).forEach(view => {
            const { position, fov } = views[view];
            // 创建新的相机
            const viewCamera = new PerspectiveCamera(
                fov,
                this.sizes.width / this.sizes.height,
                0.1,
                1000
            );
            viewCamera.position.set(...position);
            viewCamera.lookAt(center);
            this.renderer.render(this.scene, viewCamera);
            const viewSnapshot = this.renderer.domElement.toDataURL("image/png");
            // console.log(`${view} view snapshot:`, viewSnapshot);
            arr.push(viewSnapshot)
        });
        return arr
    }
    resetPerspective(){
        console.log("重置相机")
        console.log(this)
        this.control.reset()
    }
}

export { ThreeApp }