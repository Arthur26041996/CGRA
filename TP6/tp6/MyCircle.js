/**
* MyClock
* @constructor
*/
class MyCircle extends CGFobject
{
	constructor(scene,slices)
	{
		super(scene)
		this.slices = slices;
		this.initBuffers();
	};
	
	initBuffers()
	{
		let i;
		this.alpha=(2*Math.PI)/this.slices;
		this.vertices=[];
		this.vertices.push(0,0,0);
		for(i=0;i<this.slices;i++){
			this.vertices.push(Math.cos(i*this.alpha),Math.sin(i*this.alpha),0);
		}
		
		
		
		this.indices=[];
		for(i=0;i<(this.slices-1);i++){
			this.indices.push(0,i+1,i+2);
		}
		this.indices.push(0,this.slices,1);
		
		this.texCoords=[];
		this.texCoords.push(0.5,0.5);
		for(i=0;i<this.slices;i++){
			this.texCoords.push(0.5+Math.cos(i*this.alpha)*0.5,0.5 - Math.sin(i*this.alpha)*0.5);
		}
		this.normals=[];
		this.normals = [];
        for (i=0; i <= this.slices; i++) {
            this.normals.push(0,0,1);
        }
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
	
};