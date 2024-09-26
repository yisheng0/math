<template>
    <div class="fix">
        &nbsp&nbsp&nbsp<span>x:</span>
        &nbsp&nbsp<el-input ref="xInput" style="width: 240px" placeholder="X" v-model="x" />
        <p></p>
        &nbsp&nbsp&nbsp<span>y:</span>
        &nbsp&nbsp<el-input ref="yInput" style="width: 240px" placeholder="Y" v-model="y" />
        <p></p>
        &nbsp&nbsp&nbsp<span>z:</span>
        &nbsp&nbsp<el-input ref="zInput" style="width: 240px" placeholder="Z" v-model="z" />
        <p></p>
        &nbsp&nbsp&nbsp<span>w:</span>
        &nbsp<el-input ref="wInput" style="width: 240px" placeholder="W" v-model="w" />
        <p></p>
        <el-button @click="applyMatrix">变换</el-button>
    </div>

    <div ref="container"> </div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref('1 0 0 0');
const y = ref('0 1 0 0');
const z = ref('0 0 1 0');
const w = ref('0 0 0 1');

const container = ref();
const xInput = ref();
const yInput = ref();
const zInput = ref();
const wInput = ref();

let camera, scene, renderer;
let plane;
let pointer, raycaster;

let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
let controls;

const objects = [];

function applyMatrix() {
    const x_arr = x.value.split(' ').map(Number);
    const y_arr = y.value.split(' ').map(Number);
    const z_arr = z.value.split(' ').map(Number);
    const w_arr = w.value.split(' ').map(Number);

    const matrix = new THREE.Matrix4();
    matrix.set(
        x_arr[0], x_arr[1], x_arr[2], x_arr[3],
        y_arr[0], y_arr[1], y_arr[2], y_arr[3],
        z_arr[0], z_arr[1], z_arr[2], z_arr[3],
        w_arr[0], w_arr[1], w_arr[2], w_arr[3]
    );

    rollOverMesh.applyMatrix4(matrix);
}

function handleKeydown(event) {
    if (event.key === 'Enter') {
        applyMatrix();
    } else if (event.key === 'ArrowDown') {
        if (document.activeElement === xInput.value.$el.querySelector('input')) {
            yInput.value.focus();
        } else if (document.activeElement === yInput.value.$el.querySelector('input')) {
            zInput.value.focus();
        } else if (document.activeElement === zInput.value.$el.querySelector('input')) {
            wInput.value.focus();
        }
    } else if (event.key === 'ArrowUp') {
        if (document.activeElement === wInput.value.$el.querySelector('input')) {
            zInput.value.focus();
        } else if (document.activeElement === zInput.value.$el.querySelector('input')) {
            yInput.value.focus();
        } else if (document.activeElement === yInput.value.$el.querySelector('input')) {
            xInput.value.focus();
        }
    }
}

onMounted(() => {
    init();
    window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // roll-over helpers
    const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);

    // cubes
    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.4, 0.4, 0.7) });

    // grid
    const gridHelper = new THREE.GridHelper(1000, 20);
    scene.add(gridHelper);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const geometry = new THREE.PlaneGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);

    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    scene.add(plane);

    objects.push(plane);

    // lights
    const ambientLight = new THREE.AmbientLight(0x606060, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.value.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    controls = new OrbitControls(camera, renderer.domElement);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}
</script>

<style>
.fix {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
}
</style>
