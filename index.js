import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";


//////////
//Render//
//////////
const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


//////////
//camera//
/////////
const fov = 75; //75° donc entre 0 et 90°
const aspect = w / h;
const near = 0.1; //0.1 units is when it start rendering anything closer to the camera than 0.1units will be invisible
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); //4 paramètres à mettre ( field of view,aspect, near, far )
camera.position.z = 5;

/////////
//scene//
/////////
const scene = new THREE.Scene();

//objet
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//light
const hemiLight = new THREE.HemisphereLight();
scene.add(hemiLight);

//controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate(t = 0) {
    requestAnimationFrame(animate); //on lui passe le nom de la fonction (pour faire la boucle ?) oui chaque seconte la fonction est appelé

    cube.rotation.x += 0.001;
    cube.rotation.y += 0.002;
    renderer.render(scene, camera);
    controls.update();
}
animate();