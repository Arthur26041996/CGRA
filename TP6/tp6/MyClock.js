class MyClock extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices || 12;
        this.stacks = stacks || 1;

        this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
        this.circle = new MyCircle(this.scene, this.slices);

        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.setAmbient(0, 0, 0, 1);
        this.bodyAppearance.setSpecular(0, 0, 0, 1);
        this.bodyAppearance.setDiffuse(0, 0, 0, 1);
        this.bodyAppearance.setShininess(30);

        this.clockAppearance = new CGFappearance(this.scene);
        this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.clockAppearance.setDiffuse(1, 1, 1, 1);
        this.clockAppearance.setShininess(30);
        this.clockAppearance.loadTexture("../resources/images/clock.png");
    };

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 0.2);
        this.bodyAppearance.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.2);
        this.clockAppearance.apply();
        this.circle.display();
        this.scene.popMatrix();
    };
};
