/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject
{
	constructor(scene)
	{
		super(scene);

        // Base
        this.base = new MyCylinder(scene, 20, 1);
        this.baseCover = new MyCircle(scene, 20);

        // Bottom arm
        this.body = new MyUnitCubeQuad(scene);

        // Articulation
        this.articulation = new MyCylinder(scene, 20, 1);
        this.articulationCover = new MyCircle(scene, 20);

        // Top arm
        this.arm = new MyUnitCubeQuad(scene);

        // Rope
        this.rope = new MyCylinder(scene, 20, 1);

        // Iman
        this.iman = new MyCylinder(scene, 20, 1);
        this.imanCover = new MyCircle(scene, 20);

        // Car
        this.car = new MyCar(scene);

        // variables
        this.hide = true;

	};

    display()
    {
        // Base
        this.scene.pushMatrix();
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.baseCover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.baseCover.display();
        this.scene.popMatrix();

        // Bottom arm
        this.scene.pushMatrix();
        this.scene.rotate(30 * degToRad, 1, 0, 0);
        this.scene.translate(0, 5.5, -0.5);
        this.scene.scale(1, 10, 1);
        this.body.display();
        this.scene.popMatrix();

        // Articulation
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 10, 5.2);
        this.scene.rotate(90 * degToRad, 0, 1, 0);
        this.articulation.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 10, 5.2);
        this.scene.rotate(-90 * degToRad, 0, 1, 0);
        this.articulationCover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 10, 5.2);
        this.scene.rotate(90 * degToRad, 0, 1, 0);
        this.articulationCover.display();
        this.scene.popMatrix();

        // Top arm
        this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.translate(0, 11, -10);
        this.scene.scale(1, 10, 1);
        this.arm.display();
        this.scene.popMatrix();

        // Rope
        this.scene.pushMatrix();
        this.scene.translate(0, 10, 16);
        this.scene.scale(0.05, 2.5, 0.05);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.rope.display();
        this.scene.popMatrix();

        // Iman
        this.scene.pushMatrix();
        this.scene.translate(0, 7.5, 16);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.iman.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7.5, 16);
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.imanCover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 6.5, 16);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.imanCover.display();
        this.scene.popMatrix();
    };

    rotate(){
        //
    }

    lift(){
        //
    }

    catch(){
        if(!this.hide){
            this.car.display();
        }
    }

};
