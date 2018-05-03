/**
* MyLamp
* @constructor
*/
class MyLamp extends CGFobject
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
		let i, j, c, r;
		this.alpha = (2 * Math.PI)/this.slices;
		this.beta = Math.PI/(2*this.stacks);

		this.vertices = [];
		this.vertices.push(0,0,0);
		for (i=1; i <= this.stacks; i++) {
			for (j = 0; j < this.slices; j++) {
				this.vertices.push(
					Math.sin(i*this.beta) * Math.cos(j*this.alpha), /* sin Beta * Cos Alpha = X */
					Math.sin(i*this.beta) * Math.sin(j*this.alpha), /* sin Beta * Sin Alpha = Y*/
					1-Math.cos(i*this.beta)							/* 1 - cos Beta = Z */
				);
			}
		}

		this.indices = [];
		for(i = 1; i <= this.slices; i++){
			this.indices.push(0, (i%this.slices)+1, i);
		}
		for(i = 1, j = 1; i < this.stacks; i++){
			for(; j <= (i*this.slices); j++){
				this.indices.push(
					j,
					(j%this.slices)+1+((i-1)*this.slices),
					j+this.slices
				);

				this.indices.push(
					(j%this.slices)+1+((i-1)*this.slices),
					(j%this.slices)+1+(i*this.slices),
					j+this.slices
				);
			}
		}

		this.normals = [];
		this.normals.push(0,0,-1);
		for (i=1; i <= this.stacks; i++) {
			for (j = 0; j < this.slices; j++) {
				this.normals.push(
					(Math.sin(i*this.beta) * Math.cos(j*this.alpha)),
					(Math.sin(i*this.beta) * Math.sin(j*this.alpha)),
					-(1-Math.cos(i*this.beta))
				);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
