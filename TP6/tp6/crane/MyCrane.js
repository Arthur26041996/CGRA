/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject
{
	constructor(scene, init_x, init_z)
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

		// Car
		this.car = new MyCar(scene);

		// Materials
		// Deposit zone material
		this.depositMaterial = new CGFappearance(scene);
		this.depositMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.depositMaterial.setDiffuse(0.5, 0.3, 0.2, 1.0);
		this.depositMaterial.setShininess(120);

		// Pick up zone material
		this.pickupMaterial = new CGFappearance(scene);
		this.pickupMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.pickupMaterial.setDiffuse(0.8, 0.8, 0.3, 1.0);
		this.pickupMaterial.setShininess(120);

		// Miscellaneous
        // variables
        this.hide = true;						// Hide/Show the car
		this.hold = false;						// Indicates if the crane is holding the car
		this.currRotAngle = 0;					// Current rotation angle
		this.rotAngle = (10 * degToRad);		// Angle to rotate
		this.maxRotAngle = (130 * degToRad);	// Maximun rotation angle
		this.currLiftAngle = 0;					// Current lifting angle
		this.liftAngle = (5 * degToRad);		// Angle to lift
		this.maxLiftAngle = (20 * degToRad);	// Maximun lifting angle

		// Pick up zone position
		this.pickup_x = 0.0;					// X position of pick up zone
		this.pickup_dx = 8.0;					// length of pick up zone
		this.pickup_z = 15.0;					// Z position of pick up zone
		this.pickup_dz = 6.0;					// width of pick up zone

		// Deposit zone position
		this.deposit_x = -10.0;					// X position of deposit zone
		this.deposit_dx = 10.0;					// Length of deposit zone
		this.deposit_z = -8.0;					// Z position of deposit zone
		this.deposit_dz = 9.0;					// width of deposit zone

		// Top arm fixation points
		this.articulation_y = 0;				// Y position of articulation
		this.articulation_z = 0;				// Z position of articulation
		this.rope_y = 0;						// Y position of rope's top
		this.rope_z = 0;						// Y position of rope's top

		this.init_x = init_x || 0;				// distance from crane to origin in x
		this.init_z = init_z || 0;				// distance from crane to origin in z

	};

    display()
    {
		// Crane
		this.scene.pushMatrix();
		this.scene.rotate(-130 * degToRad, 0, 1, 0);	// initial position is deposit zone
		this.scene.rotate(this.currRotAngle, 0, 1, 0);	// rotation between zones

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
		this.scene.rotate(this.currLiftAngle, 1, 0, 0);							// Top arm rotation up & down
		this.scene.translate(0, this.articulation_y, this.articulation_z);		// preventing articulation from rotating with the arm

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

		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, this.rope_y, this.rope_z);		// Moving the rope acording to arm rotation

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

		// car "held" by the iman
		if(!this.hide){
			this.scene.pushMatrix();
			this.scene.translate(this.pickup_x+1.5, 3.9, this.pickup_z+1);
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
			this.car.display();
			this.scene.popMatrix();
		}

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
		this.scene.translate(this.deposit_x, 0, this.deposit_z);
		this.scene.scale(this.deposit_dx, 0.1, this.deposit_dz);
		this.deposit.display();
		this.scene.popMatrix();



    };

	/**
	* Verify if the car is inside the pickup zone and triggers the corresponding actions
	*
	* @param time current time
	* @param carX car X value
	* @param carZ car Z value
	* @return void
	*/
	update(time, carX, carZ){
		if(!this.hold && (carX <= this.pickup_x + this.init_x/2) && (carX >= this.pickup_x + this.init_x/2 - this.pickup_dx)){
			if (carZ <= (this.pickup_z + this.init_z + this.pickup_dz/2) && carZ >= (this.pickup_z + this.init_z - this.pickup_dz/2)) {
				if (this.currRotAngle == this.maxRotAngle) {
					this.lift(time, 1);
				}
				else{
					this.rotate(time, 1);
				}
			}
			else {
				if (this.currLiftAngle > 0) {
					this.lift(time, 0);
				}
				else{
					this.rotate(time, 0);
				}
			}
		}
		else{
			if (this.currLiftAngle > 0) {
				this.lift(time, 0);
			}
			else{
				this.rotate(time, 0);
			}
		}

	}

	/**
	* rotate crane between zones
	*
	* @param timme current time
	* @param direction direction of the movemente (1 -> from deposit to pickup zone | 0 -> from pickup to deposit zone)
	* @return void
	*/
    rotate(time, direction){
		let angle = time * this.rotAngle;
		if (direction != 0) {
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
				this.hide = true;
				if(this.hold){
					this.hold = false;
				}
			}
		}
    }


	/**
	* lift crane's arm
	*
	* @param time current time
	* @param direction direction of the movemente (1 -> down | 0 -> up)
	* @return void
	*/
    lift(time, direction){
        let angle = time * this.liftAngle;
		if(direction != 0){
			if((this.currLiftAngle + angle) < this.maxLiftAngle){
				this.currLiftAngle += angle;
				this.articulation_z -= 0.95 * time * Math.cos(this.liftAngle);
				this.articulation_y += 3 * time * Math.sin(this.liftAngle);
				this.rope_z -= 2.5 * time * Math.sin(this.liftAngle);
				this.rope_y -= time * Math.cos(this.liftAngle);
			}
			else{
				this.currLiftAngle = this.maxLiftAngle;
				this.hide = false;
				this.hold = true;
			}
		}
		else{
			if ((this.currLiftAngle - angle) > 0) {
				this.currLiftAngle -= angle;
				this.articulation_z += 0.95 * time * Math.cos(this.liftAngle);
				this.articulation_y -= 3 * time * Math.sin(this.liftAngle);
				this.rope_z += 2.5 * time * Math.sin(this.liftAngle);
				this.rope_y += time * Math.cos(this.liftAngle);
			}
			else {
				this.currLiftAngle = 0;
			}
		};
    }
};
