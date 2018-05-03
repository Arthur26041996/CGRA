/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
	};

	display()
	{
        this.scene.pushMatrix();
        this.scene.translate(-2.35, 1.76, -1.35);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.35, 1.76, -1.35);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.35, 1.76, 1.35);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.35, 1.76, 1.35);
        this.scene.scale(0.3, 3.5, 0.3);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 3.66, 0);
        this.scene.scale(5, 0.3, 3);
        this.cube.display();
        this.scene.popMatrix();
	};
};
