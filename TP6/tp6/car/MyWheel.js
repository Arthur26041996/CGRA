/**
 * MyWheel
 * @constructor
 */
class MyWheel extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.cil = new MyCylinder(this.scene,20,1);
		this.circle=new MyCircle(this.scene,20);


		this.wheelCirc = new CGFappearance(this.scene);
		this.wheelCirc.setSpecular(0.2, 0.2, 0.2, 1);
		this.wheelCirc.setDiffuse(1, 1, 1, 1);
		this.wheelCirc.setShininess(30);
		this.wheelCirc.loadTexture("../resources/images/car/wheel/wheelCirc1.png");
		this.wheelCirc.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.wheel = new CGFappearance(this.scene);
		this.wheel.setSpecular(0.2, 0.2, 0.2, 1);
		this.wheel.setDiffuse(1, 1, 1, 1);
		this.wheel.setShininess(30);
		this.wheel.loadTexture("../resources/images/car/wheel/tire.png");
		this.wheel.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.default = new CGFappearance(this.scene);
		this.default.setDiffuse(0.0, 0.0, 0.0, 1.0);
		this.default.setShininess(120);
	};

	display()
	{
		// tire part
		this.scene.pushMatrix();
		this.wheel.apply();
		this.cil.display();
		this.scene.popMatrix();

		// front part
		this.scene.pushMatrix();
		this.wheelCirc.apply();
		this.scene.translate(0, 0, 1);
		this.circle.display();
		this.scene.popMatrix();

		// back part
		this.scene.pushMatrix();
		this.default.apply();
		this.scene.rotate(180 * degToRad, 0, 1, 0);
		this.circle.display();
		this.scene.popMatrix();
	};
};
