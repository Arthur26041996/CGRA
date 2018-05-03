/**
 * MyTable
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);

		this.materialTable = new CGFappearance(this.scene);
		this.materialTable.setDiffuse(0.54, 0.27, 0.07, 1);
		this.materialTable.setSpecular(0, 0, 0, 1);
		this.materialTable.setAmbient(0.3,0.3,0.3,1);
		this.materialTable.setShininess(120);

		this.materialLegs = new CGFappearance(this.scene);
		this.materialLegs.setDiffuse(0.5, 0.5, 0.5, 1);
		this.materialLegs.setSpecular(0.9, 0.9, 0.9, 1);
		this.materialLegs.setAmbient(0.3,0.3,0.3,1);
		this.materialLegs.setShininess(10);
	};

	display()
	{
        this.scene.pushMatrix();
        this.scene.translate(-2.35, 1.76, -1.35);
        this.scene.scale(0.3, 3.5, 0.3);
		this.materialLegs.apply();
		this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.35, 1.76, -1.35);
        this.scene.scale(0.3, 3.5, 0.3);
		this.materialLegs.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.35, 1.76, 1.35);
        this.scene.scale(0.3, 3.5, 0.3);
		this.materialLegs.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.35, 1.76, 1.35);
        this.scene.scale(0.3, 3.5, 0.3);
		this.materialLegs.apply();
        this.cube.display();
        this.scene.popMatrix();

		this.materialTable.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 3.66, 0);
        this.scene.scale(5, 0.3, 3);
        this.cube.display();
        this.scene.popMatrix();

	};
};
