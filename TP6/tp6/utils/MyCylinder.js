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
		this.texCoords = [];
    	for (i = 0; i <= this.stacks; i++) {
            for (j = 0; j <= this.slices; j++) {
                this.vertices.push(Math.cos(j * this.alpha), Math.sin(j * this.alpha), i/this.stacks);
				this.texCoords.push(j/this.slices, i/this.stacks);
            }
        }

		/* TODO: redo indexes */
		this.indices = [];
		for (i = 0; i < this.stacks; i++) {
			for (j = 0; j < this.slices; j++) {
				this.indices.push((j+1)+(i+1)*this.slices, j+i*this.slices, (j+1)+i*this.slices);
				this.indices.push((j+1)+(i+1)*this.slices, (j+1)+i*this.slices, (j+2)+(i+1)*this.slices);
			}
		}


		this.normals = [];
		for (i = 0; i <= this.stacks; i++) {
			for (j = 0; j <= this.slices; j++) {
				this.normals.push(Math.cos(j * this.alpha), Math.sin(j * this.alpha), 0);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
