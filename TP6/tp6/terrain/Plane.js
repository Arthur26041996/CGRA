
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{

	constructor(scene, nrDivs, altimetry, minS, maxS, minT, maxT)
	{
		super(scene);

		// nrDivs = 8 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 8;

		// set altimetry if not provided
		altimetry = altimetry || [
									[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0 ],
									[ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.0 ],
									[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
									[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
									[ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
									[ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0 ],
									[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
									[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
									[ 0.0 , 2.0 , 3.0, 2.5, 3.0, 0.0, 3.6, 2.0, 4.0 ]
								 ];

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.altimetry = altimetry;

		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;

		this.initBuffers();
	};

	initBuffers()
	{
		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)

				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15

		*/

		// Generate vertices and normals
		this.vertices = [];
		this.normals = [];

		// Uncomment below to init texCoords
		this.texCoords = [];

		var zCoord = -0.5;

		for (var j = 0; j <= this.nrDivs; j++)
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++)
			{
				this.vertices.push(xCoord, this.altimetry[j][i], zCoord);

				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).

				// texCoords should be computed here; uncomment and fill the blanks
				// this.texCoords.push(i/this.nrDivs, j/this.nrDivs);
				this.texCoords.push(this.minS + (i * (this.maxS - this.minS)/this.nrDivs), this.minT + (j * (this.maxT - this.minT)/this.nrDivs))

				xCoord += this.patchLength;
			}
			zCoord += this.patchLength;
		}


		function calcAngleDegrees(x, y) {
			return Math.atan2(y, x) * 180 / Math.PI;
		}

		for (let i = 0; i < this.nrDivs; i++) {
			for (let j = 0; j <= this.nrDivs; j++) {
				if(j < this.nrDivs){
					this.normals.push(
										(this.altimetry[i][j+1] - this.altimetry[i][j]),
										1,
										(this.altimetry[i+1][j] - this.altimetry[i][j]),
					);
				}
				else{
					this.normals.push(
										0,
										1,
										(this.altimetry[i+1][j] - this.altimetry[i][j]),
					);
				}
			}
		}
		for (let j = 0; j <= this.nrDivs; j++) {
			if(j < this.nrDivs){
				this.normals.push(
									(this.altimetry[this.nrDivs][j+1] - this.altimetry[this.nrDivs][j]),
									1,
									0
				);
			}
			else{
				this.normals.push(
									0,
									1,
									0
				);
			}
		}

		// Generating indices
		/* for nrDivs = 3 output will be
			[
				 0,  4, 1,  5,  2,  6,  3,  7,
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind=0;
        //
        //
		// for (var j = 0; j < this.nrDivs; j++)
		// {
		// 	for (var i = 0; i <= this.nrDivs; i++)
		// 	{
		// 		this.indices.push(ind);
		// 		this.indices.push(ind+this.nrDivs+1);
        //
		// 		ind++;
		// 	}
		// 	if (j+1 < this.nrDivs)
		// 	{
		// 		// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
		// 		// degenerate triangles will not generate fragments
		// 		this.indices.push(ind+this.nrDivs);
		// 		this.indices.push(ind);
		// 	}
		// }
        //
		// this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

		/* Alternative with TRIANGLES instead of TRIANGLE_STRIP. More indices, but no degenerate triangles */

		for (var j = 0; j < this.nrDivs; j++)
		{
			for (var i = 0; i < this.nrDivs; i++)
			{
				this.indices.push(ind, ind+this.nrDivs+1, ind+1);
				this.indices.push(ind+1, ind+this.nrDivs+1, ind+this.nrDivs+2 );

				ind++;
			}
			ind++;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;


		this.initGLBuffers();
	};

};
