function SolverProcedure( input )
{
	var output = 0;

	var totalArea = 0;
	var lines = input.split( "\n" );

	for( var i = 0; i < lines.length; i++ )
	{
		var dimensions = lines[i].split( "x" );

		var area1 = dimensions[0] * dimensions[1];
		var area2 = dimensions[1] * dimensions[2];
		var area3 = dimensions[2] * dimensions[0];

		var surfaceArea = 2 * ( area1 + area2 + area3 );

		var minFaceArea = Min3( area1, area2, area3 );

		totalArea += surfaceArea + minFaceArea;

	}
	output = totalArea;
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