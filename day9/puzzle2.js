function SolverProcedure( input )
{
	var output = 0;

	var distances = {};

	var lines = input.split( "\n" );
	for( var i = 0; i < lines.length; i++ )
	{
		if( lines[i].length == 0 )
			continue;
		lines[i] = lines[i].split( " = " );
		lines[i][0] = lines[i][0].split( " to " );

		if( !distances[ lines[i][0][0] ] )
		{
			distances[ lines[i][0][0] ] = {};
		}
		distances[ lines[i][0][0] ][ lines[i][0][1] ] = parseInt( lines[i][1] );
		if( !distances[ lines[i][0][1] ] )
		{
			distances[ lines[i][0][1] ] = {};
		}
		distances[ lines[i][0][1] ][ lines[i][0][0] ] = parseInt( lines[i][1] );
	}

	cities = [];
	for( var city in distances )
	{
		cities.push( city );
	}

	var permutations = [];
	permutations[0] = [];
	for( var i = 0; i < cities.length; i++ )
	{
		permutations[0][i] = i;
	}

	var len = permutations[0].length;
	for( var i = 0;;i++ )
	{
		var k = 0, l = 0;
		var lastPermutation = true;
		for( k = len - 2; k >= 0; k-- )
		{
			if( permutations[i][k] < permutations[i][k+1] )
			{
				lastPermutation = false;
				break;
			}
		}

		if( lastPermutation )
			break;

		for( l = len - 1; l > k; l-- )
		{
			if( permutations[i][k] < permutations[i][l] )
				break;
		}

		permutations[i+1] = [];
		for( var n = 0; n < len; n++ )
		{
			permutations[i+1][n] = permutations[i][n];
		}

		var tmp = permutations[i+1][k];
		permutations[i+1][k] = permutations[i+1][l];
		permutations[i+1][l] = tmp;

		for( var n = k + 1; n < len; n++ )
		{
			if( n < len - 1 - (n - k - 1) )
			{
				var tmp = permutations[i+1][n];
				permutations[i+1][n] = permutations[i+1][len - 1 - (n - k - 1)];
				permutations[i+1][len - 1 - (n - k - 1)] = tmp;
			}
		}
	}

	var routes = "<br>";
	for( var i = 0; i < permutations.length; i++ )
	{
		for( var t = 0; t < len; t++ )
		{
			routes += cities[ permutations[i][t] ] + "->";
		}
		routes += "<br>";
	}

	routeLength = [];
	for( var i = 0; i < permutations.length; i++ )
	{
		routeLength[i] = 0;
		for( var t = 0; t < len - 1; t++ )
		{
			routeLength[i] += distances[ cities[ permutations[i][t] ] ][ cities[ permutations[i][t+1] ] ];
		}
		// console.log( routeLength[i] );
	}

	routeLength.sort();

	output = routeLength[ routeLength.length - 1 ];
	return output;
}
