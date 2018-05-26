var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.12, 0.56, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.enableTextures(true);

		// Terrain altimetry
		let altimetry = [
							[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0 ],
							[ 2.0 , 3.0 , 2.0, 4.0, 0.5, 6.4, 4.3, 1.3, 0.0 ],
							[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
							[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
							[ 0.0 , 0.0 , 0.0, 0.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
							[ 0.0 , 0.0 , 0.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0 ],
							[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
							[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 5.5, 6.0 ],
							[ 6.0 , 4.0 , 3.0, 2.5, 3.0, 3.5, 3.0, 4.5, 5.5 ]
						];

		// Scene elements
		this.car = new MyCar(this);
		this.terrain = new MyTerrain(this, 8, altimetry, 0, 30, 0, 30);
		this.crane = new MyCrane(this);

		//Vars to move the car
		this.rot=0;
		this.dir=0;

		//GUI
		this.light0=true;
		this.light1=false;
		this.light2=true;
		this.light3=false;
		this.light4=true;
		this.speed=3;
		this.axix=true;

		// Materials
		this.materialDefault = new CGFappearance(this);


		// Textures
		this.setUpdatePeriod(10);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0,0,0,1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		// this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		// this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		// this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		// this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[4].setPosition(0, 4, 7.5, 1.0);
		//this.lights[4].setVisible(true);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1.0);
		this.lights[3].enable();

		this.lights[4].setAmbient(0, 0, 0, 1.0);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setConstantAttenuation(0.5);
		this.lights[4].setLinearAttenuation(0);
		this.lights[4].setQuadraticAttenuation(0);
		this.lights[4].enable();

	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.axix){
			this.axis.display();
		}

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.pushMatrix();
		this.translate(-8, 0, 0);
		this.crane.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(20,0,0);
		this.car.display();
		this.popMatrix();

		this.pushMatrix();
		this.scale(50,2,50);
		this.terrain.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	update(currTime)
	{
		this.rot=0;
		this.dir=0;
		this.lastTime=this.lastTime||currTime;
		this.delta=(currTime-this.lastTime)/1000;
		this.lastTime=currTime;
		this.checkKeys(this.delta);
		this.checkLights();
		this.car.update(this.delta,this.rot,this.dir,this.speed);
	};

	checkKeys(time)
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			this.x+=(this.speed*time);
			this.dir=1;
			keysPressed=true;
		}
		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			this.x-=(this.speed*time);
			if(this.dir==1)
				this.dir=0;
			else this.dir=-1;
			keysPressed=true;
		}
		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			this.rot=1;
			keysPressed=true;
		}
		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			if(this.rot==1)
				this.rot=0;
			else this.rot=-1;
			keysPressed=true;
		}
		if (keysPressed)
			console.log(text);
	};

	checkLights()
	{
		if(!this.light0)
			this.lights[0].disable();
		else
			this.lights[0].enable();

		if(!this.light1)
			this.lights[1].disable();
		else
			this.lights[1].enable();

		if(!this.light2)
			this.lights[2].disable();
		else
			this.lights[2].enable();

		if(!this.light3)
			this.lights[3].disable();
		else
			this.lights[3].enable();

		if(!this.light4)
			this.lights[4].disable();
		else
			this.lights[4].enable();
	};

	doSomething()
	{
		console.log("Doing something...");
	};
};
