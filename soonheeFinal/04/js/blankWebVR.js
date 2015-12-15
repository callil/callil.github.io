// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xffffff, 1, 5000);

//Create a three.js camera
camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
scene.add(camera);
camera.shadowCameraVisible = true;


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

var mesh, plane, spotlight, cube, sphere;
var sphereArray = [];

/*
TODO: Create, position, and add 3d objects here
*/


var directionalLight = new THREE.DirectionalLight( "rgb(255,255,255)", 1);
directionalLight.position.set( 0, 0, 0 );
directionalLight.castShadow = true;
//directionalLight.shadowCameraVisible = true;
directionalLight.shadowMapWidth = 2048;
directionalLight.shadowMapHeight = 2048;
directionalLight.shadowDarkness = .2;
scene.add( directionalLight );



var sphereSize = 3
var sphereDist = 8
var sphereCount = 15

var sphereGeometry = new THREE.SphereGeometry( sphereSize, sphereSize, sphereSize );
sphereGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( -700, -500, 0 ) );

var sphereMaterial = new THREE.MeshBasicMaterial( { color: "rgb(0,0,255)", overdraw: 0.5, wireframe: false, fog: true, opacity: .5 } );


for (var i = 0; i < sphereCount; i++){
  for (var j = 0; j < sphereCount; j++){
    for (var k = 0; k < sphereCount; k++){



      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
      sphere.position.x = i * sphereDist*10;
      sphere.position.y = j * sphereDist*10;
      sphere.position.z = k * sphereDist*-20;

      sphereArray.push(sphere);

    }
  }
}

sphere.castShadow = true;
sphere.receiveShadow = true;

camera.position.z = 1000;
camera.lookAt( scene.position );

/*
Request animation frame loop function
*/
function animate() {
  // TODO: Apply any desired changes for the next frame here.


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
