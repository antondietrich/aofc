var lightsFront = [];
var lightsBack = [];

var neighbourBuffer = [];

function SolverProcedure( input )
{
	var lines = input.trim().split( "\n" );

	var numRows = lines.length;
	var numCols = lines[0].length;


	for( var i = 0; i < numRows; i++ )
	{
		lightsFront[i] = [];
		lightsBack[i] = [];
		neighbourBuffer[i] = [];
		for( var j = 0; j < numCols; j++ )
		{
			if( lines[i][j] == "." )
				lightsFront[i][j] = 0;
			else if( lines[i][j] == "#" )
				lightsFront[i][j] = 1;

			lightsBack[i][j] = 0;
			neighbourBuffer[i][j] = 0;
		}
	}

	lightsFront[0][0] = 1;
	lightsFront[0][numCols-1] = 1;
	lightsFront[numRows-1][0] = 1;
	lightsFront[numRows-1][numCols-1] = 1;

	PrintBuffer( lightsFront );

	var Iteration = function() {
		lightsBack = [];

		for( var y = 0; y < numRows; y++ )
		{
			lightsBack[y] = [];
			for( var x = 0; x < numCols; x++ )
			{
				var nextLightValue;
				var lightValue = lightsFront[y][x];
				var numLitNeighbours = CountLitNeighbours( x, y, lightsFront );

				neighbourBuffer[y][x] = numLitNeighbours;

				if( lightValue == 1 )
				{
					if( numLitNeighbours == 2 || numLitNeighbours == 3 )
						nextLightValue = 1;
					else
						nextLightValue = 0;
				}
				else
				{
					if( numLitNeighbours == 3 )
						nextLightValue = 1;
					else
						nextLightValue = 0;
				}

				lightsBack[y][x] = nextLightValue;
			}
		}

		lightsBack[0][0] = 1;
		lightsBack[0][numCols-1] = 1;
		lightsBack[numRows-1][0] = 1;
		lightsBack[numRows-1][numCols-1] = 1;

		lightsFront = lightsBack.slice();

		PrintBuffer( lightsFront );
	};

	var numSteps = 100;
	var step = 0;
	var timer = setInterval( function() {
		Iteration();
		step++;

		if( step >= numSteps )
		{
			clearInterval( timer );

			var totalLit = 0;
			for( var y = 0; y < numRows; y++ )
			{
				for( var x = 0; x < numCols; x++ )
				{
					totalLit += lightsFront[y][x];
				}
			}
			var output = document.getElementById( "output" );
			output.innerHTML = totalLit;

			// PrintBuffer( lightsFront );
		}
	}, 100 );


	var output = 0;
	return output;
}

function CountLitNeighbours( lightX, lightY, buffer )
{
	var sum = 0;
	for( var y = lightY - 1; y <= lightY + 1; y++ )
	{
		for( var x = lightX - 1; x <= lightX + 1; x++ )
		{
			if( y == lightY && x == lightX )
				continue;
			sum += GetLightValueAt( x, y, buffer );
		}
	}
	return sum;
}

function GetLightValueAt( col, row, buffer )
{
	if( col < 0 ||
	    row < 0 ||
	    col >= buffer[0].length ||
	    row >= buffer.length )
	   	return 0;

	return buffer[row][col];
}

var context = 0;

function PrintBuffer( buffer )
{
	var canvas;
	var imgdata;

	if( document.getElementById( "canvas" ) )
	{
		canvas = document.getElementById( "canvas" );
	}
	else
	{
		var canvas = document.createElement( "canvas" );
			canvas.id = "canvas";
			canvas.width = buffer[0].length;
			canvas.height = buffer.length;
			canvas.style.width = "400px";
			canvas.style.height = "400px";
			document.body.appendChild( canvas );

			context = canvas.getContext("2d");

	}

	imgdata = context.getImageData(0, 0, canvas.width, canvas.height );
	var stride = lightsFront[0].length;

	for( var y = 0; y < lightsFront.length; y++ )
	{
		for( var x = 0; x < lightsFront[0].length; x++ )
		{
			if( buffer[y][x] == 1 )
			{
				imgdata.data[ (y * stride + x)*4 + 0 ] = 255;
				imgdata.data[ (y * stride + x)*4 + 1 ] = 255;
				imgdata.data[ (y * stride + x)*4 + 2 ] = 255;
				imgdata.data[ (y * stride + x)*4 + 3 ] = 255;
			}
			else
			{
				imgdata.data[ (y * stride + x)*4 + 0 ] = 0;
				imgdata.data[ (y * stride + x)*4 + 1 ] = 0;
				imgdata.data[ (y * stride + x)*4 + 2 ] = 0;
				imgdata.data[ (y * stride + x)*4 + 3 ] = 255;
			}
		}
	}

	context.putImageData( imgdata, 0, 0 );
}
