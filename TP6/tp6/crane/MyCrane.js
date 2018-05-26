/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		// Crane components
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

		// Zones
		// Deposit zone
		this.deposit = new MyUnitCubeQuad(scene);

		// Pick up zone
		this.pickup = new MyUnitCubeQuad(scene);

		// Materials
		// Deposit zone material
		this.depositMaterial = new CGFappearance(scene);
		this.depositMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.depositMaterial.setDiffuse(0.5, 0.3, 0.2, 1.0);
		this.depositMaterial.setShininess(120);

		// Pick up zone material
		this.pickupMaterial = new CGFappearance(scene);
		this.pickupMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);		this.pickupMaterial.setDiffuse(0.8, 0.8, 0.3, 1.0);
		this.pickupMaterial.setShininess(120);

        // variables
        this.hide = true;						// Hide/Show the car
		this.currRotAngle = 0;					// Current rotation angle
		this.rotAngle = (5 * degToRad);			// Angle to rotate
		this.maxRotAngle = (130 * degToRad);	// Maximun rotation angle
		this.currLiftAngle = 0;					// Current lifting angle
		this.liftAngle = (5 * degToRad);		// Angle to lift
		this.maxLiftAngle = (20 * degToRad);	// Maximun lifting angle

		// Pick up zone position
		this.pickup_x = 0.0;
		this.pickup_dx = 8.0;
		this.pickup_z = 15.0;
		this.pickup_dz = 6.0;

	};

    display()
    {
		// Crane
		this.scene.pushMatrix();
		this.scene.rotate(-130 * degToRad, 0, 1, 0);

		this.scene.rotate(this.currRotAngle, 0, 1, 0);

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

		this.scene.pushMatrix();
		this.scene.rotate(this.currLiftAngle, 1, 0, 0);

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
		this.scene.translate(0, 10, -10);
        this.scene.scale(1, 8, 1);
        this.arm.display();
        this.scene.popMatrix();

        // Rope
        this.scene.pushMatrix();
        this.scene.translate(0, 10, 14);
        this.scene.scale(0.05, 2.5, 0.05);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.rope.display();
        this.scene.popMatrix();

        // Iman
        this.scene.pushMatrix();
        this.scene.translate(0, 7.5, 14);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.iman.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7.5, 14);
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.imanCover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 6.5, 14);
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.imanCover.display();
        this.scene.popMatrix();

		this.scene.popMatrix();
		this.scene.popMatrix();

		// Pick up zone
		this.scene.pushMatrix();
		this.pickupMaterial.apply();
		this.scene.translate(this.pickup_x, 0, this.pickup_z);
		this.scene.scale(this.pickup_dx, 0.1, this.pickup_dz);
		this.pickup.display();
		this.scene.popMatrix();

		// Deposit Zone
		this.scene.pushMatrix();
		this.depositMaterial.apply();
		this.scene.translate(-10, 0, -8);
		this.scene.scale(10.0, 0.1, 9.0);
		this.deposit.display();
		this.scene.popMatrix();

    };

	update(time, carX, carZ){
		if(carX < (this.pickup_x + this.pickup_dx/2) && carX > (this.pickup_x - this.pickup_dx/2)){
			if (carZ < (this.pickup_z + this.pickup_dz/2) && carZ > (this.pickup_z - this.pickup_dz/2)) {
				if (this.currRotAngle == this.maxRotAngle) {
					this.lift(time, 1);
				}
				else{
					this.rotate(time, 1);
				}
			}
		}
		else{
			if (this.liftAngle == 0) {
				this.rotate(time, 0);
			}
			else{
				this.lift(time, 0);
			}
		}
	}

    rotate(time, direction){
		let angle = time * this.rotAngle;
		if (direction) {
			if((this.currRotAngle + angle) < this.maxRotAngle){
				this.currRotAngle+=angle;
			}
			else {
				this.currRotAngle = this.maxRotAngle;
			}
		}
		else{
			if((this.currRotAngle - angle) > 0){
				this.currRotAngle-=angle;
			}
			else {
				this.currRotAngle = 0;
			}
		}
    }

    lift(time, direction){
        let angle = time * this.liftAngle;
		if(direction){
			if((this.currLiftAngle + angle) < this.maxLiftAngle){
				this.currLiftAngle += angle;
			}
			else{
				this.currLiftAngle = this.maxLiftAngle;
			}
		}
		else{
			if ((this.currLiftAngle - angle) > 0) {
				this.currLiftAngle -= angle;
			}
			else {
				this.currLiftAngle = 0;
			}
		}
    }

    catch(){
        if(!this.hide){

        }
    }

};
