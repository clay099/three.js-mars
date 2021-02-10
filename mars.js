const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 3;

const light = new THREE.DirectionalLight(0xcccccc, 1);

light.position.set(5, 3, 5);
scene.add(light);

// add planet color & texture
material.map = new THREE.TextureLoader().load("textures/diffuse.jpg");
// adds uneven surface
material.bumpMap = new THREE.TextureLoader().load("textures/bump.jpg");
// set how big of a bump you want
material.bumpScale = 0.015;

// add stars by wrapping the planet in a bigger sphere
const starsGeometry = new THREE.SphereGeometry(10, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

starsMaterial.map = new THREE.TextureLoader().load("textures/stars.jpg");
// only show the back of the star sphere as the camera will start within this sphere
starsMaterial.side = THREE.BackSide;

scene.add(starsMesh);

document.body.appendChild(renderer.domElement);

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	mesh.rotation.y -= 0.001;
};

document.addEventListener("mousemove", (e) => {
	// e.x starts at 0 and goes up to max with. by using "window.innerWidth / 2", the middle of the screen will be 0
	camera.position.x = (e.x - window.innerWidth / 2) * 0.01;
	camera.position.y = (e.y - window.innerHeight / 2) * 0.01;
	// keeps the camera focused on the planet
	camera.lookAt(scene.position);
});

animate();
