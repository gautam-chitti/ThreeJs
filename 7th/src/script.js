import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Loading manager
let clicked = false;
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('start');
}
loadingManager.onLoad = () => {
  console.log('loading');
}
loadingManager.onProgress = () => {
  console.log('pro');
}
loadingManager.onError = () => {
  console.log('error');
}

// Texture loader
const textloader = new THREE.TextureLoader(loadingManager);
let texture = textloader.load("/texture/color.jpg"); // Keep texture variable here
const sphere = new THREE.SphereGeometry(1, 100, 70);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(sphere, material);

// Scene
const scene = new THREE.Scene();
scene.add(mesh);

// Aspect
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
const cam = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
cam.position.z = 2.5;

// Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

// Button event handling
const button = document.getElementById('hehe');
const handleButtonClick = () => {
  clicked = !clicked; // Toggle clicked state
  const newTexturePath = clicked ? "/texture/displacementMap.jpg" : "/texture/color.jpg";

  // Update the texture
  textloader.load(newTexturePath, (newTexture) => {
    material.map = newTexture; // Update the material's map
    material.needsUpdate = true; // Inform Three.js to update the material
  });
};

// Attach click and touch event handlers
button.onclick = handleButtonClick;
button.ontouchstart = handleButtonClick; // Ensure touch support

// Resize event
window.addEventListener('resize', () => {
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // Aspect ratio
  cam.aspect = aspect.width / aspect.height;
  cam.updateProjectionMatrix();

  // Renderer size
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Orbit controls
const orbit = new OrbitControls(cam, canvas);
orbit.enableDamping = true;
orbit.autoRotate = true;

// Clock for animation
const clock = new THREE.Clock();

const animate = () => {
  orbit.update(); // Update OrbitControls
  renderer.render(scene, cam); // Render the scene
  window.requestAnimationFrame(animate); // Request animation frame
};

animate();
