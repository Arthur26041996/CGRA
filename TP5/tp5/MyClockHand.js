/**
* MyClockHand
* @constructor
*/
class MyClockHand extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.slices=12;
		this.stacks=1;
		this.cylinder=new MyCylinder(scene,this.slices,this.stacks);
		this.angle=0;
		
		
	};

	display() 
	{
		this.scene.pushMatrix();
		this.scene.scale(0.1,1,0.1);
		this.scene.rotate(-90*Math.PI/180,1,0,0);
		this.cylinder.display();
		this.scene.popMatrix();
	};

	setAngle(angle)
	{
		this.angle = angle*Math.PI/180;
	};
};