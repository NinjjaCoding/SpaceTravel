import * as THREE from 'three';


let scene, camera, renderer, starGeo, stars;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,
             1, 1000);
             camera.position.z = 1;
             camera.position.x = Math.PI/2; //return PI value /2

             renderer = new THREE.WebGLRenderer();
             renderer.setSize(window.innerWidth, window.innerHeight);
             document.body.appendChild(renderer.domElement);


             //individual sphereGeo slows down site..use vertices array each with start material wrapped
             starGeo = new THREE.Geometry();
             for(let i=0;i<6000;i++) {
                 let star = new THREE.Vector3(
                 Math.random() * 600 - 300,
                 Math.random() * 600 - 300,
                 Math.random() * 600 - 300
               );
               starGeo.vertices.push(star);
             }
                 star.velocity = 0; //star speed begin = 0
                 star.acceleration = 0.02;
                 starGeo.vertices.push(stars);
            }
            let starTexture = new THREE.TextureLoader().load('src/whitespher.jpg');
            let starMaterial = new THREE.PointsMaterial({
               color: 0xaaaaaa,
               size: 0.7,
               map: starTexture 
            });

            stars = new THREE.Points(starGeo, starMaterial);
            scene.add(stars);
         animate(); 
        

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

            //function to run and animate the code 
        function animate() {
            //animate star space travel
            starGeo.vertices.forEach(point => {
                point.velocity += point.acceleration;
                point.y -= point.velocity;
                if(point.y < -200 ) { //if star points go out of screen start over
                    point.y = 200;
                    point.velocity = 0; 
                }   
            });
            //now we need to update our starGeo
            starGeo.verticesNeedUpdate = true;
            stars.rotation.y += 0.002; //small rotation in stars to create 3d cinema effect

            renderer.render( scene, camera );
            requestAnimationFrame(animate);
        }
        init();
