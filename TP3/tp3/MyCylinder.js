/**
* MyQuad
* @constructor
*/
class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers()
	{
		let i, j;
		this.alpha = (2 * Math.PI)/this.slices;

		this.vertices = [];
    	for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j < this.slices; j++) {
                this.vertices.push(Math.cos(j * this.alpha), Math.sin(j * this.alpha), i/this.stacks);
            }
        }

		this.indices = [];
		for (i = 0; i < this.stacks; i++) {
			for (j = 0; j < this.slices; j++) {
				this.indices.push(j+(i+1)*this.slices, j+i*this.slices, (j+1)%this.slices+(i+1)*this.slices);
				this.indices.push((j+1)%this.slices+(i+1)*this.slices, j+i*this.slices, (j+1)%this.slices+i*this.slices);
			}
		}

		this.normals = [];
        for (j=0; j < this.slices*(this.stacks+1); j++) {
            this.normals.push(Math.cos(j * this.alpha), Math.sin(j * this.alpha), 0);
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
