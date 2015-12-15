// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();
// scene.fog = new THREE.Fog( 0xffffff, 1, 5000);

//Create a three.js camera
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 1000;
camera.position.x = 100;
camera.position.y = 100;
scene.add(camera);
// camera.shadowCameraVisible = true;


//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );


/************* TODO: Generate Your VR Scene Below *********************/

var width = window.innerWidth;
var height = window.innerHeight;

particles = new Array();

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
var particles, particle, count = 0;

var PI2 = Math.PI * 2;
var material = new THREE.SpriteMaterial( {

  color: 0xffffff,
  program: function ( context ) {

    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();

  } } );

var i = 0;

for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

  for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

    particle = particles[ i ++ ] = new THREE.Sprite( material );
    particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
    particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
    scene.add( particle );

  }

}

/*
Request animation frame loop function
*/
function animate() {
  camera.lookAt( scene.position );
  // TODO: Apply any desired changes for the next frame here.
  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      particle = particles[ i++ ];
      // particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
        // ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
      // particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

    }

  }

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
