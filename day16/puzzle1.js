// children: 3
// cats: 7
// samoyeds: 2
// pomeranians: 3
// akitas: 0
// vizslas: 0
// goldfish: 5
// trees: 3
// cars: 2
// perfumes: 1


var properties = [ "children", "cats", "samoyeds", "pomeranians", "akitas",
				   "vizslas", "goldfish", "trees", "cars", "perfumes" ];

var search = [ 3, 7, 2, 3, 0, 0, 5, 3, 2, 1 ];

function SolverProcedure( input )
{
	var sue = [];

	var lines = input.split( "\n" );
	for( var i = 0; i < lines.length; i++ )
	{
		if( lines[i].length == 0 )
			continue;

		sue[i] = [];

		lines[i] = lines[i].substr( lines[i].indexOf( ":" ) + 2 );
		lines[i] = lines[i].split( ", " );
		var known = {};
		for( var t = 0; t < lines[i].length; t++ )
		{
			known[ lines[i][t].split( ": " )[0] ] = lines[i][t].split( ": " )[1];
		}

		for( var t = 0; t < properties.length; t++ )
		{
			if( known[ properties[t] ] )
			{
				sue[i][t] = parseInt( known[ properties[t] ] );
			}
			else
			{
				sue[i][t] = search[t];
			}
		}
	}

	var score = 0;
	var result = 0;

	for( var i = 0; i < sue.length; i++ )
	{
		var relevance = Relevance( sue[i], search );
		if( relevance > score )
		{
			score = relevance;
			result = i;
		}
	}

	console.log( search );
	console.log( sue[ result ] );
	console.log( score );

	var output = result + 1;
	return output;
}

function Relevance( v1, v2 )
{
	var n1 = Normalize( v1 );
	var n2 = Normalize( v2 );
	var result = Dot( n1, n2 );
	return result;
}

function Normalize( v )
{
	var length = Math.sqrt( Dot( v, v ) );

	var result = [];
	for( var i = 0; i < v.length; i++ )
	{
		result[i] = v[i] / length;
	}
	return result;
}

function Dot( v1, v2 )
{
	var result = 0;
	for( var i = 0; i < v1.length; i++ )
	{
		result += v1[i] * v2[i];
	}
	return result;
}
