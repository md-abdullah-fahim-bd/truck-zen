let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const weatherSelect = document.getElementById('weather');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    installPrompt.style.display = 'block';
  }
});

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed');
      }
      deferredPrompt = null;
      installPrompt.style.display = 'none';
    });
  }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

const truckGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const truckMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const truck = new THREE.Mesh(truckGeometry, truckMaterial);
truck.position.set(0, 0.5, 0);
scene.add(truck);

const roadSegments = [];
const segmentLength = 10;
const segmentWidth = 5;
let zOffset = 0;

function generateRoadSegment(z) {
  const geometry = new THREE.PlaneGeometry(segmentWidth, segmentLength);
  const material = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide });
  const segment = new THREE.Mesh(geometry, material);
  segment.rotation.x = -Math.PI / 2;
  segment.position.set(0, 0, z);
  segment.position.y = noise.perlin2(z / 10, 0) * 2;
  scene.add(segment);
  roadSegments.push(segment);
}

for (let i = 0; i < 20; i++) {
  generateRoadSegment(i * segmentLength - 100);
}

camera.position.set(0, 2, 5);
camera.lookAt(truck.position);

const keys = {};
document.addEventListener('keydown', (e) => { keys[e.key] = true; });
document.addEventListener('keyup', (e) => { keys[e.key] = false; });
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    truck.position.set(0, 0.5, 0);
    camera.position.set(0, 2, 5);
    camera.lookAt(truck.position);
  }
});

weatherSelect.addEventListener('change', () => {
  const weather = weatherSelect.value;
  if (weather === 'sunny') scene.background = new THREE.Color(0x87ceeb);
  else if (weather === 'rainy') scene.background = new THREE.Color(0x4682b4);
  else if (weather === 'night') scene.background = new THREE.Color(0x191970);
});

let truckSpeed = 0;
const maxSpeed = 0.2;
const acceleration = 0.005;
const deceleration = 0.003;
const steering = 0.03;

function animate() {
  requestAnimationFrame(animate);

  if (keys['ArrowUp'] || keys['w']) truckSpeed = Math.min(truckSpeed + acceleration, maxSpeed);
  else if (keys['ArrowDown'] || keys['s']) truckSpeed = Math.max(truckSpeed - acceleration, -maxSpeed / 2);
  else truckSpeed *= (1 - deceleration);

  if (keys['ArrowLeft'] || keys['a']) truck.rotation.y += steering;
  if (keys['ArrowRight'] || keys['d']) truck.rotation.y -= steering;

  truck.position.z += truckSpeed * Math.cos(truck.rotation.y);
  truck.position.x += truckSpeed * Math.sin(truck.rotation.y);
  truck.position.y = noise.perlin2((truck.position.z + 100) / 10, 0) * 2 + 0.5;

  camera.position.x = truck.position.x;
  camera.position.z = truck.position.z + 5;
  camera.position.y = truck.position.y + 2;
  camera.lookAt(truck.position);

  zOffset += truckSpeed;
  if (zOffset > segmentLength) {
    roadSegments.shift().geometry.dispose();
    generateRoadSegment(roadSegments[roadSegments.length - 1].position.z + segmentLength);
    zOffset -= segmentLength;
  }

  renderer.render(scene, camera);
}

if (typeof noise !== 'undefined') {
  noise.seed(Math.random());
  animate();
} else {
  console.error('Noise.js not loaded');
}