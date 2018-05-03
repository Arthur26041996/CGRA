/**
* MyClock
* @constructor
*/
class MyClock extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.slices=12;
		this.stacks=1;
		this.cylinder=new MyCylinder(scene,this.slices,this.stacks);
		this.circle=new MyCircle(scene,this.slices);
		this.hours=new MyClockHand(scene);
		this.mins=new MyClockHand(scene);
		this.secs=new MyClockHand(scene);
		this.clockAppearance = new CGFappearance(this.scene);
		this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
		this.clockAppearance.setDiffuse(1, 1, 1, 1);
		this.clockAppearance.setShininess(30);
		this.clockAppearance.loadTexture("../resources/images/clock.png");
		
		this.materialA = new CGFappearance(this.scene);
		this.materialA.setAmbient(0.0,0.0,0.0,1);
		this.materialA.setDiffuse(0,0,0,1);
		this.materialA.setSpecular(0,0,0,1);
		this.materialA.setShininess(0);

		this.hours.setAngle(90);
		this.mins.setAngle(180);
		this.secs.setAngle(270);
		

	};

	display() 
	{
		this.scene.pushMatrix();
		this.scene.scale(1,1,0.2);
		this.cylinder.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(0,0,0.2);
		this.clockAppearance.apply();
		this.circle.display();
		this.scene.popMatrix();

		/*Ponteiros*/
			/*Horas*/
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.3);
		this.scene.rotate(-this.hours.angle,0,0,1);
		this.scene.scale(0.3,0.4,0.3);
		this.materialA.apply();
		this.hours.display();
		this.scene.popMatrix();
			/*Minutos*/
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.3);
		this.scene.rotate(-this.mins.angle,0,0,1);
		this.scene.scale(0.2,0.6,0.2);
		this.materialA.apply();
		this.mins.display();
		this.scene.popMatrix();
			/*Segundos*/
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.3);
		this.scene.rotate(-this.secs.angle,0,0,1);
		this.scene.scale(0.15,0.65,0.15);
		this.materialA.apply();
		this.secs.display();
		this.scene.popMatrix();
	};

	update(time)
	{
		this.secs.setAngle((time%60)*360.0/60.0);
		this.mins.setAngle(((time/60.0)%60)*360.0/60.0);
		this.hours.setAngle(time/3600.0*360.0/12.0);
	};
};