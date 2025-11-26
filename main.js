import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("wave");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// IŞIK
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1);
scene.add(light);

// DALGA GEOMETRİSİ
const geometry = new THREE.PlaneGeometry(8, 3, 200, 40);

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0.2,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -0.3;
scene.add(mesh);

// ANİMASYON
function animate(t) {
  const time = t * 0.0008;

  const pos = mesh.geometry.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    const wave =
      Math.sin(x * 2 + time * 2) * 0.2 +
      Math.cos(y * 3 + time * 1) * 0.15;

    pos.setZ(i, wave);
  }

  pos.needsUpdate = true;
  mesh.geometry.computeVertexNormals();

  mesh.rotation.z = Math.sin(time * 0.3) * 0.05;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
