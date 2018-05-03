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

		// Materials
		this.legs = new CGFappearance(this.scene);
		this.legs.setAmbient(1, 1, 1, 1);
		this.legs.setDiffuse(0.5, 0.5, 0.5, 1);
		this.legs.setSpecular(1, 1, 1, 1);
		this.legs.setShininess(30);

		// Textures
		this.tableAppearance = new CGFappearance(this.scene);
		this.tableAppearance.setSpecular(0.2, 0.2, 0.2, 1);
		this.tableAppearance.setDiffuse(1, 1, 1, 1);
		this.tableAppearance.setShininess(30);
		this.tableAppearance.loadTexture("../resources/images/table.png");
	};

	display()
	{
		this.scene.pushMatrix();
		this.scene.translate(-2.35, 1.76, -1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		this.legs.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.35, 1.76, -1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		this.legs.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.35, 1.76, 1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		this.legs.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.35, 1.76, 1.35);
		this.scene.scale(0.3, 3.5, 0.3);
		this.legs.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 3.66, 0);
		this.scene.scale(5, 0.3, 3);
		this.tableAppearance.apply();
		this.cube.display();
		this.scene.popMatrix();

	};
};
