var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    // add the cube to the scene
    scene.add(cube);
    return(cube);
}
function init() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Mostrar ejes del mundo
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    Cubo = [];  // Array
    lado = 5; //variable de lado 
    Cubo.push(cubo(lado, lado, lado, 0xFFDD00, 'Standard', false));   //Creación del primer cubo con lado=1
    Cubo.push(cubo(lado, lado, lado, 0xFF0000, 'Standard', false));   //Creación del segundo cubo con escala de lado/2
    Cubo.push(cubo(lado, lado, lado, 0x00FFFF0, 'Standard', false));  //Creación del segundo cubo con escala de lado/4

//Traslación de los Cubos
for (i=0; i<3; i++){
    Cubo[i].translateX(lado/2+1); //Traslado en X
    Cubo[i].translateY(lado/2); //Traslado en Y
    Cubo[i].translateZ(lado/2+1); //Traslado en Z
}

// Escalado y Traslación en eje Y
for (i=0; i<3; i++) if(i==1 || i==2){
    escala = 1/(2*i);  //Escalado de dimensiones a la mitad del anterior
    unidades = (lado/2)+(lado/4)+((lado/2+lado/4)/2)*(i-1); //Da la posición para ubicarlos uno encima de otro
    Cubo[i].scale.set(escala, escala, escala); //
    Cubo[i].translateY (unidades); 
}

//Se aplica la rotación del primer y ultimo cubo en el eje Y
angulo= Math.PI/3;
Cubo[0].rotateY ( angulo );  
Cubo[2].rotateY ( angulo );  

    //Luz (requerida para el material MeshLambertMaterial)
    light = new THREE.PointLight(0xFFFF00);       //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( 30, 40, 30);             //  Localización de la luz. (x, y, z).
    scene.add( light ); 

    // Posición de la cámara
    camera.position.set(lado*1.5, lado*5, lado*10);
    camera.lookAt(scene.position);

    // agregar la salida render al HTML
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}