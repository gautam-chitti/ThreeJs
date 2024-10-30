import * as REE from 'three';
const box = new REE.BoxGeometry(1, 1, 1)
const material = new REE.MeshBasicMaterial({color : 'blue'})
const mesh = new REE.Mesh(box,material)
mesh.position.z = 1  
const box2 = new REE.BoxGeometry(1, 1, 1)
const material2 = new REE.MeshBasicMaterial({color : 'green'})
const mesh2 = new REE.Mesh(box2,material2)
mesh2.position.y = 2;
const box3 = new REE.BoxGeometry(1, 1, 1)
const material3 = new REE.MeshBasicMaterial({color : 'yellow'})
const mesh3 = new REE.Mesh(box3,material3)
mesh3.position.y = -2;
const scene = new REE.Scene()
const group = new REE.Group()
   

group.add(mesh, mesh2,mesh3)
// group.position.x = 3;
scene.add(group)





const aspect = {
    width : window.innerWidth,
    height : window.innerHeight
}
const cam = new REE.PerspectiveCamera(75,aspect.width/aspect.height,1,2000)
// cam.position.x = 1;
// cam.position.y = 1;
cam.position.z = 5;
scene.add(cam)

// clock
const clock = new REE.Clock()



// Rendering

const canvas = document.querySelector('.draw');
const renderer = new REE.WebGLRenderer({canvas});
renderer.setSize(aspect.width,aspect.height);
renderer.setAnimationLoop(animate);

function animate(){
const epTime = clock.getElapsedTime()
mesh.rotation.x = epTime;
mesh2.rotation.y = epTime;
mesh3.rotation.z = epTime;
group.position.x = epTime;
renderer.render(scene,cam)
}

// while(group.position.x > -5){
//     function animate(){
//     const epTime = clock.getElapsedTime()
//     mesh.rotation.x = epTime;
//     mesh2.rotation.y = epTime;
//     mesh3.rotation.z = epTime;
//     group.position.x = -epTime;
//     renderer.render(scene,cam)
//     }
// }
