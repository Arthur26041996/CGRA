/**
 * MyTrapeze3D
 * @constructor
 */
class MyTrapeze3D extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.trapeze = new MyTrapeze2D(this.scene);
		this.quad = new MyQuad(this.scene);
	};

	display()
	{
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
		this.scene.rotate(90 * degToRad, 0, 1, 0);
        this.scene.scale(2, 2, 1);
		this.trapeze.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
        this.scene.scale(2, 2, 1);
		this.trapeze.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.75);
		this.scene.rotate(-Math.atan2(0.5, 1), 1, 0, 0);
		this.scene.scale(1, 1.12, 1);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.75);
		this.scene.rotate(Math.atan2(0.5, 1) + Math.PI, 1, 0, 0);
		this.scene.scale(1, 1.12, 1);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.scale(1, 2, 1);
        this.quad.display();
        this.scene.popMatrix();

	};
};
