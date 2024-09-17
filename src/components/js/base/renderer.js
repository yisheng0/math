import { WebGLRenderer, VSMShadowMap,ACESFilmicToneMapping,SRGBColorSpace } from 'three';

function createRenderer(container,sizes) {
    console.log('createRenderer',container)
    const renderer = new WebGLRenderer({
        canvas: container,
        antialias: true, //抗锯齿
    })
    const width = container.clientWidth;
    const height = container.clientHeight;
    console.log('renderer size',width,height)
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = VSMShadowMap
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // renderer.outputColorSpace = SRGBColorSpace
    return renderer
}

export { createRenderer }