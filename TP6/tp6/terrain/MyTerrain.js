/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane
{
	constructor(scene, ndivs, altimetry, minS, maxS, minT, maxT)
	{
		super(scene, ndivs, altimetry, minS, maxS, minT, maxT);

		this.terrain = new CGFappearance(scene);
        this.terrain.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.terrain.setShininess(120);
        this.terrain.loadTexture("../resources/images/terrain.png");
        this.terrain.setTextureWrap("REPEAT", "REPEAT");

	};

    display()
    {
		this.terrain.apply();
		super.display();
    };
};
