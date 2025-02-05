import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarsfield from "./src/getStarfield.js";


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
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/earth/8k_earth_daymap.jpg")
});
const earthMesh = new THREE.Mesh(geometry, material);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180; // 23.4 angle de l'axe sur lequel tourne la terre
earthGroup.add(earthMesh);
scene.add(earthGroup);

const stars = getStarsfield({ numStars: 2000 });
scene.add(stars);

const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/earth/8k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending, // permet de bien superposer
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/earth/8k_earth_clouds.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

//light
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// scene.add(hemiLight);


//controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate(t = 0) {
    requestAnimationFrame(animate); //on lui passe le nom de la fonction (pour faire la boucle ?) oui chaque seconte la fonction est appelé

    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
    controls.update();
}
animate();