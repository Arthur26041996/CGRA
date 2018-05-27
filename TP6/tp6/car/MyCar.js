/**
 * MyCar
 * @constructor
 */
class MyCar extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		//variables to move the wheels
		this.max_rot=Math.PI/4;
		this.velocity=0;
		this.curr_rot1=0;	//variable to rotate front and back
		this.curr_rot=0;	//variable to rotate right or left
		this.mov=0;			//total to move
		this.rot_car=0.0;	//rotation of the car
		this.x=0;			//position in x
		this.z=0;			//position in z

		this.vehicleAppearances=[];		//array with the textures
		
		this.r=0.6;			//variable radius
		this.cube = new MyUnitCubeQuad(this.scene);
		this.trapeze = new MyTrapeze2D(this.scene);
		this.trapeze3D = new MyTrapeze3D(this.scene);
		this.quad = new MyQuad(this.scene);
        this.semisphere = new MySemisphere(this.scene, 20, 10);
		this.wheel=new MyWheel(this.scene);

		this.default = new CGFappearance(this.scene);
		this.default.setAmbient(1.0, 1.0, 1.0, 1.0);

		this.glass = new CGFappearance(this.scene);
		this.glass.setAmbient(0.0, 0.0, 0.0, 1.0);
		this.glass.setDiffuse(0.4, 0.4, 0.4, 1.0);
		this.glass.setSpecular(0.5, 0.5, 0.5, 1.0);
		this.glass.setShininess(0);
		this.glass.loadTexture("../resources/images/glass.png");
		//textures for the car
		this.paint0 = new CGFappearance(this.scene);
		this.paint0.loadTexture("../resources/images/car/paint/black.png");
		this.vehicleAppearances.push(this.paint0);
		this.paint1 = new CGFappearance(this.scene);
		this.paint1.loadTexture("../resources/images/car/paint/blue.png");
		this.vehicleAppearances.push(this.paint1);
		this.paint2 = new CGFappearance(this.scene);
		this.paint2.loadTexture("../resources/images/car/paint/green.png");
		this.vehicleAppearances.push(this.paint2);
		this.paint3 = new CGFappearance(this.scene);
		this.paint3.loadTexture("../resources/images/car/paint/red.png");
		this.vehicleAppearances.push(this.paint3);
		this.paint4 = new CGFappearance(this.scene);
		this.paint4.loadTexture("../resources/images/car/paint/white.png");
		this.vehicleAppearances.push(this.paint4);


		this.frontLights = new CGFappearance(this.scene);
		this.frontLights.setDiffuse(1.0, 1.0, 0.0, 1.0);

		this.backLights = new CGFappearance(this.scene);
		this.backLights.setDiffuse(1.0, 0.0, 0.0, 1.0);

		this.bumper = new CGFappearance(this.scene);
		this.bumper.setDiffuse(0.3, 0.3, 0.3, 1.0);
		this.bumper.setShininess(120);
		this.bumper.loadTexture("../resources/images/car/bumper.png");
	};

	display()
	{
		
		
		
		this.scene.pushMatrix();
		this.scene.translate(this.x,0,this.z);//tanslation of the car
		this.scene.rotate(this.rot_car,0,1,0);
		this.scene.translate(0,0,1.3);
		
		// Body
		this.vehicleAppearances[this.scene.currVehicleAppearance].apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.1, 0);
		this.scene.scale(2.5, 1, 5);
        this.cube.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 2.6, 0);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.scale(2.5, 1.5, 1);
		this.quad.display();
		this.scene.popMatrix();

		  // Mirros
        this.scene.pushMatrix();
        this.scene.translate(1.45, 1.7, 1);
        this.scene.scale(0.4, 0.3, 0.1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.45, 1.7, 1);
        this.scene.scale(0.4, 0.3, 0.1);
        this.cube.display();
        this.scene.popMatrix();

		//body
		this.bumper.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.6, 2.55);
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.rotate(90 * degToRad, 0, 0, 1);
		this.scene.scale(0.5, 0.1, 1.25);
		this.trapeze3D.display();
		this.scene.popMatrix();

		this.default.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 1.65, -2.45);
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.rotate(180 * degToRad, 0, 0, 1);
		this.scene.scale(0.5, 0.1, 1.25);
		this.trapeze3D.display();
		this.scene.popMatrix();


        // Head
		this.glass.apply();

        this.scene.pushMatrix();
        this.scene.translate(1.25, 2.1, 0);
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.scale(3, 2, 1);
		this.trapeze.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(-1.25, 2.1, 0);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
		this.scene.scale(3, 2, 1);
		this.trapeze.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 2.1, 1.125);
		this.scene.rotate(-Math.atan2(0.75, 1), 1, 0, 0);
		this.scene.scale(2.5, 1.25, 1);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 2.1, -1.125);
		this.scene.rotate(Math.atan2(0.75, 1) + Math.PI, 1, 0, 0);
		this.scene.scale(2.5, 1.25, 1);
		this.quad.display();
		this.scene.popMatrix();

		


        // Front lights
		this.frontLights.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.9, 1.35, 2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.semisphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 1.35, 2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.semisphere.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(0.6, 1.35, 2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.semisphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.6, 1.35, 2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.semisphere.display();
        this.scene.popMatrix();


        // Back lights
		this.backLights.apply();

		this.scene.pushMatrix();
        this.scene.translate(0.9, 1.35, -2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.semisphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 1.35, -2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.semisphere.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(0.6, 1.35, -2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.semisphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.6, 1.35, -2.55);
        this.scene.scale(0.15, 0.15, 0.05);
        this.semisphere.display();
        this.scene.popMatrix();


      

		this.default.apply();

		//Wheels
		//back left
		this.scene.pushMatrix();
	 	this.scene.rotate(90*Math.PI/180,0,1,0);
	 	this.scene.translate(1.3, 0.6, 1.0);
		this.scene.scale(this.r,this.r,0.5);
		this.scene.rotate(-this.curr_rot1,0,0,1);
		this.wheel.display();
		this.scene.popMatrix();
		//back rigth
		this.scene.pushMatrix();
	 	this.scene.rotate(-90*Math.PI/180,0,1,0);
	 	this.scene.translate(-1.3, 0.6, 1.0);
		this.scene.scale(this.r,this.r,0.5);
		this.scene.rotate(this.curr_rot1,0,0,1);
		this.wheel.display();
		this.scene.popMatrix();
		//front left
		this.scene.pushMatrix();
	 	this.scene.rotate(90*Math.PI/180,0,1,0);
	 	this.scene.translate(-1.3, 0.6, 1.0);
		this.scene.scale(this.r,this.r,0.5);
		this.scene.rotate(this.curr_rot,0,1,0);
		this.scene.rotate(-this.curr_rot1,0,0,1);
		this.wheel.display();
		this.scene.popMatrix();
		//front rigth
		this.scene.pushMatrix();
	 	this.scene.rotate(-90*Math.PI/180,0,1,0);
	 	this.scene.translate(1.3, 0.6, 1.0);
		this.scene.scale(this.r,this.r,0.5);
		this.scene.rotate(this.curr_rot,0,1,0);
		this.scene.rotate(this.curr_rot1,0,0,1);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	};
	update(time,rot,dir,speed){
		//increase or decrease velocity
		this.updateVelocity(time,dir,speed);
		//translate the car
		this.moveCar(time);
		//rotate to the right or left
		this.rotateWheel(time,rot);
		//rotate backwards or frontwards
		this.rotWheel(time,dir);
		//rotate the all car
		this.rotateCar(time,dir);
	};

	updateVelocity(time,dir,speed){
		if(dir>0){
			if(this.velocity<0)	{			//the break is faster than the acceleration
				this.velocity+=2*time*speed;
				if(this.velocity>0)
					this.velocity=0;
			}
			else this.velocity+=time*speed;
		}
		if(dir<0){
			if(this.velocity>0)	{			//the break is faster than the acceleration
				this.velocity-=2*time*speed;
				if(this.velocity<0)
					this.velocity=0;
			}
			else this.velocity-=time*speed;
		}
	};

	rotateCar(time){
		if(this.velocity>0){
				this.rot_car+=this.curr_rot*time*2;
		}
		if(this.velocity<0){
				this.rot_car-=this.curr_rot*time*2;
		}
		
	};


	moveCar(time){
		/*if(this.velocity<0){
			this.x-=(this.velocity*time)*Math.sin(this.rot_car);
			this.z-=(this.velocity*time)*Math.cos(this.rot_car);
		}*/
		if(this.velocity!=0)
		{
			this.x+=(this.velocity*time)*Math.sin(this.rot_car);
			this.z+=(this.velocity*time)*Math.cos(this.rot_car);
		}
	};

	//rotate backwards or frontwards, speed parameter is in radians per second
	rotWheel(time,dir){
		if(this.velocity!=0){
				this.curr_rot1-=(time*this.velocity);
		}	
	};
	//rotate wheel to the right or to the left
	rotateWheel(time,rot){
		if(rot<0){	//case: the user presses A
			if(Math.abs(this.curr_rot)<this.max_rot || this.curr_rot<0){
				if(this.curr_rot<0)	//case: the wheel is to the right side
					this.curr_rot+=2*(time*Math.PI/8);	//to move the wheel faster
				else
					this.curr_rot+=(time*Math.PI/8);	//case: the wheel is to the left side
			}
			if(Math.abs(this.curr_rot)>this.max_rot)
				this.curr_rot=this.max_rot;
		}	
		if(rot>0){	//case :the user presses D
			if(Math.abs(this.curr_rot)<this.max_rot || this.curr_rot>0)	//not in the max angle
				if(this.curr_rot>0)	//case: the wheel is to the left side
					this.curr_rot-=2*(time*Math.PI/8);	//to move the wheel faster
				else
					this.curr_rot-=(time*Math.PI/8);	//case: the wheel is to the right side
			if(Math.abs(this.curr_rot)>this.max_rot)
				this.curr_rot=-this.max_rot;
		}
		if(rot==0){	//case: user releases the turning keys too get back to the frontal position
			if(this.curr_rot>0){
				this.curr_rot-=(time*Math.PI/8);
				if(this.curr_rot<0)
				this.curr_rot=0;
			}else
				if(this.curr_rot<0){
					this.curr_rot+=(time*Math.PI/8);
				if(this.curr_rot>0)
				this.curr_rot=0;


				}
		}
	};
	
};
