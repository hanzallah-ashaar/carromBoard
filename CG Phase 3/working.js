var striker = ( function(){

	"use strict"

	var scene = new THREE.Scene(),
	renderer = new THREE.WebGLRenderer(),
	//amb_light = new THREE.AmbientLight(0xffffff),
	light,
	camera,
	box,
	cylinder,
	black_goti,
	plane,
	stats;
	

	function init(){
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	document.getElementById("webgl-container").appendChild(renderer.domElement);
	//amb_light.castShadow = true;
	//scene.add(amb_light);

	camera = new THREE.PerspectiveCamera(
		35,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);

	camera.position.z = 170;
	camera.position.y = 20;
	scene.add(camera);

	// box = new THREE.Mesh(
	// 	new THREE.BoxGeometry(20,20,20),
	// 	new THREE.MeshBasicMaterial({color: 0xFF0000})
	// );

	// box.name = 'box';

	// scene.add(box);

	// var geometry = new THREE.CylinderGeometry( 5, 5, 1, 30 );
	// var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	// var cylinder = new THREE.Mesh( geometry, material );

	plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200),
		new THREE.MeshPhongMaterial({
			color: 0x966f33,
			ambient: 0xffffff,
			specular: 0x222222,
			shininess: 100,
			shading: THREE.FlatShading,
			side: THREE.DoubleSide
	}));

	plane.rotation.x = 90 * (Math.PI / 180);
	plane.position.y = -10;

	plane.name = 'plane';
	plane.receiveShadow = true;
	scene.add(plane);

	light = new THREE.DirectionalLight(new THREE.Color('#ffffff'));
	light.position.set(0, 80, 170);
	light.castShadow = true;
	scene.add(light);

	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry(5,5,1,40, 50),
		new THREE.MeshPhongMaterial({
			color: 0xffffff,
			ambient: 0x444444,
			specular: 0x000000,
			shininess: 50,
			shading: THREE.FlatShading,
			side: THREE.DoubleSide
		}));

	cylinder.name = 'cylinder';
	cylinder.castShadow = true;
	cylinder.position.y = -7.5;

	scene.add( cylinder );

	black_goti = new THREE.Mesh(
		new THREE.CylinderGeometry(3,3,1,40, 50),
		new THREE.MeshPhongMaterial({
			color: 0x000000,
			ambient: 0x444444,
			specular: 0x000000,
			shininess: 50,
			shading: THREE.FlatShading,
			side: THREE.DoubleSide
		}));

	black_goti.name = 'cylinder';
	black_goti.castShadow = true;
	black_goti.position.y = -7.5;
	black_goti.position.x = 50;

	scene.add( black_goti );

	stats = new Stats();
	stats.setMode(0);


	//for stats box
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);


	render();
	}

	function render(){
		//cylinder.rotation.x += 0.01;

		//box.rotation.y += 0.01;

		renderer.render(scene, camera);
		requestAnimationFrame(render);

		stats.update();
	}

	window.onload = init;

	return{
		scene: scene
	}

}
)();