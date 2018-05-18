/**
* MyQuad
* @constructor
*/
class MyPrism extends CGFobject
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
		this.beta = this.alpha/2;

		this.vertices = [];
		for (i = 0; i < this.stacks; i++) {
			for (j=0; j < this.slices; j++) {
				this.vertices.push(Math.cos(j * this.alpha), Math.sin(j * this.alpha), (i+1)/this.stacks);
				this.vertices.push(Math.cos(j * this.alpha), Math.sin(j * this.alpha), i/this.stacks);
				this.vertices.push(Math.cos((j+1) * this.alpha), Math.sin((j+1) * this.alpha), (i+1)/this.stacks);
				this.vertices.push(Math.cos((j+1) * this.alpha), Math.sin((j+1) * this.alpha), i/this.stacks);
			}
		}

		this.indices = [];
		for (j=0; j < 4*this.slices*this.stacks; j+=4) {
			this.indices.push(j, j+1, j+3);
			this.indices.push(j+3, j+2, j);
		}

		this.normals = [];
		for (i = 0; i < this.stacks; i++) {
			for (j=0; j < 2*Math.PI; j+=this.alpha) {
				this.normals.push(Math.cos(j + this.beta), Math.sin(j + this.beta), 0);
				this.normals.push(Math.cos(j + this.beta), Math.sin(j + this.beta), 0);
				this.normals.push(Math.cos(j + this.alpha - this.beta), Math.sin(j + this.alpha - this.beta), 0);
				this.normals.push(Math.cos(j + this.alpha - this.beta), Math.sin(j + this.alpha - this.beta), 0);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
