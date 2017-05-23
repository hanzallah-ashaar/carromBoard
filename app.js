var striker = (function() {

    "use strict"

    var scene = new THREE.Scene(), //for a new Scene in which we will put our objects
        renderer = new THREE.WebGLRenderer(), //render to render changes
        amb_light = new THREE.AmbientLight(0xffffff), //ambient light for an overall illuminating effect
        //initialisations
        light,
        state,
        camera,
        box, //board variable
        cylinder,
		velocity,
        black_goti,
        plane, group,bg,
        stats,gootiyan,gootiPosns,line,
        controls;

        state=0;

        function Updategootiyan(){
           // console.log(velocity[9][1]);
            gootiPosns[9][0]+=velocity[9][0];
            gootiPosns[9][2]+=velocity[9][1];
            gootiyan[9].position.set(gootiPosns[9][0],gootiPosns[9][1],gootiPosns[9][2]);
            if(velocity[9][1]<-0.001){
                //velocity[9][0]+=0.01;
                velocity[9][1]+=0.001;
            }
             else if(velocity[9][1]>0.001){//velocity[9][0]-=0.01;
                 velocity[9][1]-=0.001;
             }
             else{
                velocity[9][1] = 0;
                if(state==1){
                gootiPosns[9][0]=0;
                gootiPosns[9][1]=-1.8;
                gootiPosns[9][2]=2.6;
                gootiyan[9].position.set(gootiPosns[9][0],gootiPosns[9][1],gootiPosns[9][2]);
                }
                state=0;
                
             }

             //boundry check
             var i=9;
              if(gootiPosns[i][0] < -6){
                gootiPosns[i][0] = -6;
                // HitSfx.play()/\;
                velocity[i][0] = -velocity[i][0];
              }
              if(gootiPosns[i][2] < -6){
                gootiPosns[i][2] = -6;
                // HitSfx.play();
                velocity[i][2] = -velocity[i][1];
              }
              if(gootiPosns[i][0] > 6){
                gootiPosns[i][0] = 6;
                //HitSfx.play();
                velocity[i][0] = -velocity[i][0];
              }
              if(gootiPosns[i][2] > 3){
                gootiPosns[i][2] = 3;
                // HitSfx.play();
                velocity[i][1] = -velocity[i][1];
              }

        
            }


        var keyUpDown=function(keycode) {
           // if(state==0){
            switch(keycode) {
                
              case 32: //Space - power
                    if(!state){
                        scene.remove(line);
                        state = 1;
                        var actualpower = .2;
                        velocity[9][0] = 0;//*Math.sin(theta * (Math.PI/180));
                        velocity[9][1] = -actualpower;//*Math.cos(theta * (Math.PI/180));
                        //console.log(velocity[9][1]);
                    }
                break;

              case 37: //Left
                 if(!state){
                    if((gootiPosns[9][0] - 0.03) > -1.8){  
                      gootiPosns[9][0] -= 0.03;
                      gootiyan[9].position.set(gootiPosns[9][0],gootiPosns[9][1],gootiPosns[9][2]);

                      scene.remove(line);
                      var linematerial = new THREE.LineBasicMaterial({ color: 0xff0000 });
                      var linegeometry = new THREE.Geometry();
                      linegeometry.vertices.push(new THREE.Vector3(gootiPosns[9][0], gootiPosns[9][1], gootiPosns[9][2]));
                      linegeometry.vertices.push(new THREE.Vector3(gootiPosns[9][0] , gootiPosns[9][1] , gootiPosns[9][2]-1.3));
                      line = new THREE.Line(linegeometry, linematerial);
                      scene.add(line);
                    }
                }
                break;
              case 38: //Up
                if(power > -3){
                 power -= 0.1;
                }
                break;
              case 39: //Right
              if(!state){
              //alert("right");
                if((gootiPosns[9][0] + 0.03) < 1.8 /*&& state == 0*/){
                  gootiPosns[9][0] += 0.03;
                  gootiyan[9].position.set(gootiPosns[9][0],gootiPosns[9][1],gootiPosns[9][2]);

                  scene.remove(line);
                  var linematerial = new THREE.LineBasicMaterial({ color: 0xff0000 });
                  var linegeometry = new THREE.Geometry();
                  linegeometry.vertices.push(new THREE.Vector3(gootiPosns[9][0], gootiPosns[9][1], gootiPosns[9][2]));
                  linegeometry.vertices.push(new THREE.Vector3(gootiPosns[9][0], gootiPosns[9][1], gootiPosns[9][2]-1.3));
                  line = new THREE.Line(linegeometry, linematerial);
                  scene.add(line);
                }
                }
                break;
              case 40: //Down
                if(power < 0){
                  power += 0.1;
                }
                break;
            }//switch
         //   }//state
  }//event


    function init() {
        renderer.setSize(window.innerWidth-20, window.innerHeight-20); //for dynamic window size
        renderer.shadowMap.enabled = true; //to show shadows

        document.getElementById("webGl-container").appendChild(renderer.domElement);
        scene.add(amb_light); //adds ambient light for overall effect of light

        camera = new THREE.PerspectiveCamera(
            35, //vertical field of view
            (window.innerWidth)/ (window.innerHeight), //aspect ratio
            1, // near
            1000 //far
        );

        //default camera coordinates
        camera.position.z = 0;
        camera.position.y = 15;
		camera.rotation.x = -90 * Math.PI / 180;
        scene.add(camera); //adds camera to the scene

        box = new THREE.Mesh( //board is made 
            new THREE.BoxGeometry(50, 50, 2),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture("board.jpg") //applying board texture to it from a google image
            })
        );
        var side1 = new THREE.Mesh(  //borders to the board
            new THREE.BoxGeometry(50, 0.1, 2), //front
            new THREE.MeshBasicMaterial({
                color: 0x000000
            })
        );
        var side2 = new THREE.Mesh(
            new THREE.BoxGeometry(50, 2, 0.1), //left
            new THREE.MeshBasicMaterial({
                color: 0x000000
            })
        );
        var side3 = new THREE.Mesh(
            new THREE.BoxGeometry(50, 0.1, 2), //back
            new THREE.MeshBasicMaterial({
                color: 0x000000
            })
        );
        var side4 = new THREE.Mesh(
            new THREE.BoxGeometry(50, 2, 0.1), //right
            new THREE.MeshBasicMaterial({
                color: 0x000000
            })
        );

		var objectLoader = new THREE.ObjectLoader();
objectLoader.load("wooden-coffe-table.json", function ( obj ) {
	obj.scale.set(5,5,5);
			//obj.scale.set(-10,-10,-10);
obj.position.y = -9;
			scene.add( obj );
});



        //										STRIKER

        var cubeMaterialArray = []; // making an array to store texture for each face
        cubeMaterialArray.push(new THREE.MeshBasicMaterial({
            color: 0xffffff										//White color for the width of striker
        }));
        cubeMaterialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("striker.jpg")	//Front face of striker
        }));
        cubeMaterialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("striker.jpg")	//Back face of striker
        }));
        var Materials = new THREE.MeshFaceMaterial(cubeMaterialArray); //adding array to material

        var striker = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(5, 5, .5, 32),  // making cylinder with both circles of size 5. Height is 0.5. Segments to be used 23 (for smoother shape)
            Materials
        );



        group = new THREE.Object3D(); // make a group object to group board, borders and striker


        box.name = 'box';
        side1.name = 'side1';
        side2.name = 'side2';
        side3.name = 'side3';
        side4.name = 'side4';

        box.updateMatrix();
        group.add(side1);	//add sides of border to the board
        group.add(side2);	//add sides of border to the board
        group.add(side3);	//add sides of border to the board
        group.add(side4);	//add sides of border to the board
        group.add(striker);	//group striker with board
        group.add(box);		// add board to the group
        //group.add(obj);
		scene.add(group)	// Add the group to the scene
        group.position.y = -2;
        group.position.z = -10;
        group.scale.set(0.15,0.15,0.15);

        plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100),
            new THREE.MeshPhongMaterial({
                //color: 0x966f33,
                map: THREE.ImageUtils.loadTexture("floor.jpg"),
				specular: 0x222222,
                shininess: 100,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide
            }));


		        plane.name = 'plane';
        plane.receiveShadow = true;
        scene.add(plane);
        
        light = new THREE.DirectionalLight(new THREE.Color('#ffffff')); //adding a directional light
        light.position.set(0, 80, 170);
        light.castShadow = true;
        scene.add(light);
        	//group.scale.set(-10,-10,-10);



        //Striker
/*******positioning and rotating the objects so that the borders are aligned with the board*******/
        plane.rotation.x = 90 * (Math.PI / 180);
        plane.position.y = -10;
		//plane.position.z = 40;
        box.rotation.x = 90 * (Math.PI / 180);
        box.position.z = 70;
        //group.position.y= -0.9;				//so the board appears on the plane, not hovering over it
        side1.rotation.x = 90 * (Math.PI / 180);
        side2.rotation.x = 180 * (Math.PI / 180);
        side2.rotation.y = 90 * (Math.PI / 180);
        side3.rotation.x = 90 * (Math.PI / 180);
        side4.rotation.x = 180 * (Math.PI / 180);
        side4.rotation.y = 90 * (Math.PI / 180);
        side1.position.z = 95;
        side3.position.z = 45;
        side2.position.z = 70;
        side2.position.x = -25;
        side4.position.z = 70;
        side4.position.x = 25;
      striker.position.y = 1;	//place striker on the board
        striker.position.z = 90;//place striker on the board
        striker.scale.x = .5; //changing size of the striker
        striker.scale.y = .5;
        striker.scale.z = .5;
		
		
		
		gootiyan = [10];
  gootiPosns = new Array(10);
  for (var i = 0; i < 10; i++) {
    gootiPosns[i] = new Array(3);
  }
  	
    velocity = new Array(10);
  for (var i = 0; i < 10; i++) {
    velocity[i] = new Array(3);
    velocity[i][0] = velocity[i][1] = 0;  //x and y component of velocities are zero
    velocity[i][2] = 1;  //mark as active
  
  }
		
		
		//Coin add
  for (var i=0; i<10; i++) {
    var cgeometry = new THREE.CylinderGeometry( 0.08, 0.08, 0.025, 32 );
    switch(i){
      case 0: // QUEEN
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(0,-1.8,0.4);
        gootiPosns[i][0] = 0; gootiPosns[i][1] = 0; gootiPosns[i][2] = 0;
		cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
		break;
      case 1: //white
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(0.3,-1.8,0.4);
        gootiPosns[i][0] = 0; gootiPosns[i][1] = 0.2; gootiPosns[i][2] = 0;
		cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
        break;
      case 2:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(0.9,-1.8,0);
        gootiPosns[i][0] = 0; gootiPosns[i][1] = -0.2; gootiPosns[i][2] = 0;
		cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
        break;
      case 3:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(0.2,-1.8,0);
        gootiPosns[i][0] = 0.2; gootiPosns[i][1] = 0; gootiPosns[i][2] = 0;
		cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
        break;

      case 4:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(-0.2,-1.8,0);
        gootiPosns[i][0] = -0.2; gootiPosns[i][1] = 0; gootiPosns[i][2] = 0;
		cylinder.rotation.x = 90 * (Math.PI / 180);
        cylinder.scale.set(2,2,2);
		break;
      case 5:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(1.1,-1.8,0);
        gootiPosns[i][0] = -0.15; gootiPosns[i][1] = -0.15; gootiPosns[i][2] = 0;
        cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
		break;
      case 6:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(-0.6,-1.8,0);
        gootiPosns[i][0] = -0.15; gootiPosns[i][1] = 0.15; gootiPosns[i][2] = 0;
        cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
		break;
      case 7:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(-0.8,-1.8,0);
        gootiPosns[i][0] = 0.15; gootiPosns[i][1] = -0.15; gootiPosns[i][2] = 0;
        cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
		break;
      case 8:
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(-0.4,-1.8,0);
        gootiPosns[i][0] = 0.15; gootiPosns[i][1] = 0.15; gootiPosns[i][2] = 0;
        cylinder.rotation.x = 90 * (Math.PI / 180);
		cylinder.scale.set(2,2,2);
		break;
      case 9:
        var cgeometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.025, 32 );
        var cmaterial = new THREE.MeshBasicMaterial( {color: 0x0080ff} );
        var cylinder = new THREE.Mesh( cgeometry, cmaterial );
        cylinder.position.set(0.0,-1.8,2.6);
        gootiPosns[i][0] = 0; gootiPosns[i][1] = -1.8; gootiPosns[i][2] = 2.6;
		cylinder.scale.set(3,3,3);
		
        var linematerial = new THREE.LineDashedMaterial({ color: 0xff0000,dashSize:.2,gapSize:0.1 });
        var linegeometry = new THREE.Geometry();
        linegeometry.vertices.push(new THREE.Vector3(0, 1.42, 0));
        linegeometry.vertices.push(new THREE.Vector3(0, 1.42 - 1, 0));
        line = new THREE.Line(linegeometry, linematerial);
        scene.add(line);
		cylinder.rotation.x = 90 * (Math.PI / 180);
        line.rotation.x = 90 * (Math.PI / 180);
		line.position.set(0.0,-1.80,0.9);
		break;
    }
    cylinder.rotateX(Math.PI/2);
    gootiyan[i] = cylinder;
    scene.add( cylinder );
  }
  //Coin done
		
	//event
	window.onkeydown=function(event){
    keyUpDown(event.keyCode);
     };

		
		//to show stats at the top left of the screen
        stats = new Stats();
        stats.setMode(0); //0 shows FPS stats on default. stats changes on click


        //for stats box
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);

        //for Orbit Camera
        //controls = new THREE.OrbitControls(camera); //
        //controls.addEventListener('change', render); //event listener for input corresponding to change in camera sucha as mouse activity


        render();
		
	
    }

    function render() {

        Updategootiyan();
        //console.log('dafuq');

        renderer.render(scene, camera); // render camera and the scene
        requestAnimationFrame(render);

        stats.update(); //updating stats to see the resources being used in our project
    }

    window.onload = init; //loads this function first

    return {
        scene: scene //for debugging purposes
    }

})();