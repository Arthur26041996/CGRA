/**
 * MyCar
 * @constructor
 */
class MyCar extends CGFobject
{
	constructor(scene)
	{
		super(scene);
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

		this.paint = new CGFappearance(this.scene);
		this.paint.loadTexture("../resources/images/carpaint.png");

		this.frontLights = new CGFappearance(this.scene);
		this.frontLights.setDiffuse(1.0, 1.0, 0.0, 1.0);

		this.backLights = new CGFappearance(this.scene);
		this.backLights.setDiffuse(1.0, 0.0, 0.0, 1.0);

		this.bumper = new CGFappearance(this.scene);
		this.bumper.setDiffuse(0.3, 0.3, 0.3, 1.0);
		this.bumper.setShininess(120);
		this.bumper.loadTexture("../resources/images/bumper.png");
	};

	display()
	{
		// Body
		this.paint.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 1.1, 0);
		this.scene.scale(2.5, 1, 5);
        this.cube.display();
        this.scene.popMatrix();

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

		this.paint.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 2.6, 0);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.scale(2.5, 1.5, 1);
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


        // Mirros
		this.paint.apply();

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

		this.default.apply();

		//Wheels
		this.scene.pushMatrix();
	 	this.scene.rotate(90*Math.PI/180,0,1,0);
	 	this.scene.translate(-1.3, 0.6, 1.0);
		this.scene.scale(0.6,0.6,0.5);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	 	this.scene.rotate(90*Math.PI/180,0,1,0);
	 	this.scene.translate(1.3, 0.6, 1.0);
		this.scene.scale(0.6,0.6,0.5);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	 	this.scene.rotate(-90*Math.PI/180,0,1,0);
	 	this.scene.translate(-1.3, 0.6, 1.0);
		this.scene.scale(0.6,0.6,0.5);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	 	this.scene.rotate(-90*Math.PI/180,0,1,0);
	 	this.scene.translate(1.3, 0.6, 1.0);
		this.scene.scale(0.6,0.6,0.5);
		this.wheel.display();
		this.scene.popMatrix();
	};
};
