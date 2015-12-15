// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();

//Create a three.js camera
var camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 2, 10000 );
scene.add(camera);

//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );


/************* TODO: Generate Your VR Scene Below *********************/

var width = window.innerWidth;
var height = window.innerHeight;

renderer.setClearColor(0xffffff);
renderer.setSize(width, height);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = false;

/*
TODO: Create, position, and add 3d objects here
*/

var axis =  new THREE.AxisHelper(20);
scene.add (axis);

var grid = new THREE.GridHelper(100,1);
var color = new THREE.Color('rgb(200,200,200');
grid.setColors(color,'rgb(200,200,200');
scene.add (grid);

var cubeGeometry = new THREE.BoxGeometry(5,5,5);
var cubeMaterial = new THREE.MeshLambertMaterial({side: THREE.DoubleSide, overdraw:.5});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//cube.receiveShadow = true;

var planeGeometry = new THREE.PlaneGeometry ( 30,30,30);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.rotation.x = -.5*Math.PI;
plane.receiveShadow = true;

scene.add(plane);

cube.position.x = 2.5;
cube.position.y = 2.5;
cube.position.z = 2.5;
cube.castShadow = true;

scene.add(cube);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.castShadow = true;
spotLight.position.set (5,30,45);

scene.add(spotLight);

camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;

camera.lookAt(scene.position);


/*
Request animation frame loop function
*/
function animate() {
  // TODO: Apply any desired changes for the next frame here.
  cube.rotation.y += .01;

  //Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect.
  effect.render( scene, camera );
  requestAnimationFrame( animate );

}

animate();	// Kick off animation loop



/***************** TODO: Generate Your VR Scene Above *****************/



/*
Listen for click event to enter full-screen mode.
We listen for single click because that works best for mobile for now
*/
document.body.addEventListener( 'click', function(){
  effect.setFullScreen( true );
})

/*
Listen for keyboard events
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    controls.resetSensor(); //zero rotation
  } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
    effect.setFullScreen(true) //fullscreen
  }
};
window.addEventListener("keydown", onkey, true);

/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
