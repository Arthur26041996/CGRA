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
		this.wheelCirc.loadTexture("../resources/images/wheelCirc1.png");
		this.wheelCirc.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	};

	display() 
	{
		// The body
		this.scene.pushMatrix();
		this.cil.display();
		this.scene.popMatrix();
		
		// upper part
		this.scene.pushMatrix();
		this.wheelCirc.apply();
		this.scene.translate(0, 0, 1);
		this.circle.display();
		this.scene.popMatrix();
	};
};