/**
 * MyCar
 * @constructor
 */
class MyCar extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyUnitCubeQuad(this.scene);
        this.semisphere = new MyLamp(this.scene, 20, 20);
		this.wheel=new MyWheel(this.scene);
	};

	display() 
	{
		// Body
        this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.translate(0, 0, -0.3);
        this.scene.scale(2.5, 5, 0.6);
        this.quad.display();
        this.scene.popMatrix();


        // Head
        this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.translate(0, 0, -0.9);
        this.scene.scale(2.5, 2.5, 0.6);
        this.quad.display();
        this.scene.popMatrix();


        // Front lights
        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.3, 2.6);
        this.scene.scale(0.3, 0.3, 0.1);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.semisphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 0.3, 2.6);
        this.scene.scale(0.3, 0.3, 0.1);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.semisphere.display();
        this.scene.popMatrix();


        // Back lights
        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.3, -2.6);
        this.scene.scale(0.3, 0.3, 0.1);
        this.semisphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9, 0.3, -2.6);
        this.scene.scale(0.3, 0.3, 0.1);
        this.semisphere.display();
        this.scene.popMatrix();


        // Mirros
        this.scene.pushMatrix();
        this.scene.translate(1.45, 0.6, 1);
        this.scene.scale(0.4, 0.3, 0.1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.45, 0.6, 1);
        this.scene.scale(0.4, 0.3, 0.1);
        this.quad.display();
        this.scene.popMatrix();
		
		//Wheels
		this.scene.pushMatrix();
	 	this.scene.rotate(90*Math.PI/180,0,1,0);
	 	this.scene.translate(-1.3,0,1.0);
		this.scene.scale(0.45,0.45,0.5);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	 	this.scene.rotate(90*Math.PI/180,0,1,0);
	 	this.scene.translate(1.3,0,1.0);
		this.scene.scale(0.45,0.45,0.5);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	 	this.scene.rotate(-90*Math.PI/180,0,1,0);
	 	this.scene.translate(-1.3,0,1.0);
		this.scene.scale(0.45,0.45,0.5);
		this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	 	this.scene.rotate(-90*Math.PI/180,0,1,0);
	 	this.scene.translate(1.3,0,1.0);
		this.scene.scale(0.45,0.45,0.5);
		this.wheel.display();
		this.scene.popMatrix();
	};
};