import * as Ree from 'three';

// First row meshes
const box1 = new Ree.BoxGeometry(0.5, 0.5, 0.5);
const material1 = new Ree.MeshBasicMaterial({ color: 'orange' });
const mesh1 = new Ree.Mesh(box1, material1);
mesh1.position.set(-1, 1, 0); // Adjusted position

const box2 = new Ree.BoxGeometry(0.5, 0.5, 0.5);
const material2 = new Ree.MeshBasicMaterial({ color: 'white' });
const mesh2 = new Ree.Mesh(box2, material2);
mesh2.position.set(0, 1, 0); // Centered position

const box3 = new Ree.BoxGeometry(0.5, 0.5, 0.5);
const material3 = new Ree.MeshBasicMaterial({ color: 'green' });
const mesh3 = new Ree.Mesh(box3, material3);
mesh3.position.set(1, 1, 0); // Adjusted position

// Second row meshes
const box4 = new Ree.BoxGeometry(0.5, 0.5, 0.5);
const material4 = new Ree.MeshBasicMaterial({ color: 'red' });
const mesh4 = new Ree.Mesh(box4, material4);
mesh4.position.set(-1, 0, 0); // Positioned below mesh1

const box5 = new Ree.BoxGeometry(0.5, 0.5, 0.5);
const material5 = new Ree.MeshBasicMaterial({ color: 'white' });
const mesh5 = new Ree.Mesh(box5, material5);
mesh5.position.set(0, 0, 0); // Positioned below mesh2

const box6 = new Ree.BoxGeometry(0.5, 0.5, 0.5);
const material6 = new Ree.MeshBasicMaterial({ color: 'blue' });
const mesh6 = new Ree.Mesh(box6, material6);
mesh6.position.set(1, 0, 0); // Positioned below mesh3

const aspect = {
  width : window.innerWidth,
  heigth : window.innerHeight
}
const cursor ={
  x: 0,
  y: 0 
}

window.addEventListener('mousemove' , (event) =>{
  cursor.x = event.clientX/ window.innerWidth -0.5;
  cursor.y = event.clientY/ window.innerHeight -0.5;
}) 

// Camera and scene
const cam = new Ree.PerspectiveCamera(75, aspect.width / aspect.heigth);
const scene = new Ree.Scene();
cam.position.z = 3; // Adjust camera position if necessary

// Add meshes to the scene
scene.add(mesh1, mesh2, mesh3);
scene.add(mesh4, mesh5, mesh6);
const clock = new Ree.Clock();


// Renderer
const canvas = document.querySelector('.draw');
const renderer = new Ree.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', (event) =>{
   aspect.width = window.innerWidth;
   aspect.heigth = window.innerHeight;
   cam.aspect = aspect.width / aspect.heigth;
   cam.updateProjectionMatrix();
   renderer.setSize(aspect.width ,  aspect.heigth)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const rot ={
  x : 0,
  y : 0

}
window.addEventListener("click", (event) =>{
  let ep = clock.getElapsedTime();
  rot.x = Math.sin(ep);
  rot.y = Math.cos(ep);
  console.log(rot.x, ep)
})
const animate = () => {
  
  mesh5.lookAt(new Ree.Vector3(cursor.x, -cursor.y , 1))
  // mesh2.rotation.set(new Ree.Vector2(rot.x,rot.y))
 

  renderer.render(scene, cam);
  window.requestAnimationFrame(animate);
};
animate();
