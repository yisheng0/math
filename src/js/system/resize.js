let camera,renderer

function resizeEvent() {
    // 获取第一个 canvas 元素
    const canvas = document.querySelector('canvas');
    let sizes = { width: 0, height: 0 };
    if (canvas) {
        sizes.width = canvas.clientWidth;
        sizes.height = canvas.clientHeight;
    } else {
        console.error("Canvas element not found");
        return;
    }
    console.log("resize", sizes.width, sizes.height);
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
export function resizeEventListener(_camera,_renderer){
    camera = _camera; renderer = _renderer
    window.addEventListener('resize', resizeEvent)
}
export function clear(){
    window.removeEventListener("resize", resizeEvent)
}
