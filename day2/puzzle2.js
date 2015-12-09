function SolverProcedure( input )
{
	var output = 0;

	var totalLength = 0;
	var lines = input.split( "\n" );

	for( var i = 0; i < lines.length; i++ )
	{
		var dimensions = lines[i].split( "x" );

		dimensions[0] = parseInt( dimensions[0] );
		dimensions[1] = parseInt( dimensions[1] );
		dimensions[2] = parseInt( dimensions[2] );

		var perimeter1 = ( dimensions[0] + dimensions[1]) * 2;
		var perimeter2 = ( dimensions[1] + dimensions[2]) * 2;
		var perimeter3 = ( dimensions[2] + dimensions[0]) * 2;

		var minPerimeter = Min3( perimeter1, perimeter2, perimeter3 );
		var volume = dimensions[0] * dimensions[1] * dimensions[2];

		totalLength += minPerimeter + volume;
	}
	output = totalLength;
	return output;
}

function Max3( a, b, c )
{
	if( a >= b && a >= c )
	{
		return a;
	}
	if( b >= a && b >= c )
	{
		return b;
	}
	return c;
}

function Min3( a, b, c )
{
	if( a <= b && a <= c )
	{
		return a;
	}
	if( b <= a && b <= c )
	{
		return b;
	}
	return c;
}
