/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
	constructor(scene, ndivs, minS, maxS, minT, maxT)
	{
		super(scene, ndivs, minS, maxS, minT, maxT);

        this.terrain = new CGFappearance(scene);
        this.terrain.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.terrain.setShininess(120);
        this.terrain.loadTexture("../resources/images/terrain.png");
        this.terrain.setTextureWrap("REPEAT", "REPEAT");
	};

    display()
    {
        this.terrain.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-90 *  degToRad, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        super.display();
        this.scene.popMatrix();
    };
};
