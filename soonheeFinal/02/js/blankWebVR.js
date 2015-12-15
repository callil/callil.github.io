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

      var container;

      var scene, camera, light, renderer;
      var geometry, cube, mesh, material;
      var mouse, center;
      var stats;

      var video, texture;

      if ( Detector.webgl ) {

        init();
        animate();

      } else {

        document.body.appendChild( Detector.getWebGLErrorMessage() );

      }

      function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        var info = document.createElement( 'div' );
        info.id = 'info';
        info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - kinect';
        document.body.appendChild( info );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        // container.appendChild( stats.domElement );

        // camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
        // camera.position.set( 0, 0, 500 );

        // scene = new THREE.Scene();
        center = new THREE.Vector3();
        center.z = - 1000;

        video = document.createElement( 'video' );
        video.addEventListener( 'loadedmetadata', function ( event ) {

          texture = new THREE.VideoTexture( video );
          texture.minFilter = THREE.NearestFilter;

          var width = 1280, height = 800;
          var nearClipping = 760, farClipping = 1;

          geometry = new THREE.BufferGeometry();

          var vertices = new Float32Array( width * height * 3 );

          for ( var i = 0, j = 0, l = vertices.length; i < l; i += 3, j ++ ) {

            vertices[ i ] = j % width;
            vertices[ i + 1 ] = Math.floor( j / width );

          }

          geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

          material = new THREE.ShaderMaterial( {

            uniforms: {

              "map": { type: "t", value: texture },
              "width": { type: "f", value: width },
              "height": { type: "f", value: height },
              "nearClipping": { type: "f", value: nearClipping },
              "farClipping": { type: "f", value: farClipping },

              "pointSize": { type: "f", value: 2 },
              "zOffset": { type: "f", value: 0 }

            },
            vertexShader: document.getElementById( 'vs' ).textContent,
            fragmentShader: document.getElementById( 'fs' ).textContent,
            blending: THREE.AdditiveBlending,
            depthTest: false, depthWrite: false,
            transparent: true

          } );

          mesh = new THREE.Points( geometry, material );
          scene.add( mesh );

          var gui = new dat.GUI();
          gui.add( material.uniforms.nearClipping, 'value', 1, 10000, 1.0 ).name( 'nearClipping' );
          gui.add( material.uniforms.farClipping, 'value', 1, 10000, 1.0 ).name( 'farClipping' );
          gui.add( material.uniforms.pointSize, 'value', 1, 10, 1.0 ).name( 'pointSize' );
          gui.add( material.uniforms.zOffset, 'value', 0, 4000, 1.0 ).name( 'zOffset' );
          gui.close();


        }, false );
        video.loop = true;
        video.src = 'images/output3.webm';
        video.play();

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        mouse = new THREE.Vector3( 0, 0, 1 );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function onDocumentMouseMove( event ) {

        // mouse.x = ( event.clientX - window.innerWidth / 2 ) * 2;
        // mouse.y = ( event.clientY - window.innerHeight / 2 ) * 2;

      }

      function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

      }

      function render() {

        // camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
        // camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
        camera.lookAt( center );

        renderer.render( scene, camera );

      }

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
