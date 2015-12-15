function SolverProcedure( input )
{
	var lines = input.split( "\n" );

	var happiness = {};

	for( var i = 0; i < lines.length; i++ )
	{
		// remove trailing dot
		lines[i] = lines[i].substr( 0, lines[i].length - 1 );

		var parts = lines[i].split( " would " );
		var subject = parts[0];

		var sign = 0;
		if( parts[1].indexOf( "gain" ) == 0 )
		{
			sign = 1;
		}
		else
		{
			sign = -1;
		}
		parts[1] = parts[1].substr( 5 );

		var token = "";
		var t = 0;
		while( isNumeric( parts[1][t] ) )
		{
			token += parts[1][t];
			t++;
		}

		var happinessLevel = parseInt( token ) * sign;

		var object = parts[1].substr( parts[1].lastIndexOf( " " ) + 1 )

		if( !happiness[ subject ] )
			happiness[ subject ] = {};
		happiness[ subject ][ object ] = happinessLevel;
	}

	var guests = [];
	for( var name in happiness )
	{
		guests.push( name );
	}
	var numGuests = guests.length;

	happiness[ "me" ] = {};
	for( var i = 0; i < numGuests; i++ )
	{
		happiness[ "me" ][ guests[i] ] = 0;
		happiness[ guests[i] ][ "me" ] = 0;
	}

	guests.push( "me" );
	numGuests++;

	// TODO: optimal set of different sittings?
	var sittings = GeneratePermutations( numGuests );


	var output = "";
	var deltaHappiness = [];
	for( var i = 0; i < sittings.length; i++ )
	{
		deltaHappiness[i] = 0;
		for( var t = 0; t < numGuests; t++ )
		{
			//output += guests[ sittings[i][t] ] + " - ";
			var happinessR = happiness[ guests[ sittings[i][t] ] ][ guests[ sittings[i][(t+1)%numGuests] ] ];
			var happinessL = happiness[ guests[ sittings[i][t] ] ][ guests[ sittings[i][(t+numGuests-1)%numGuests] ] ];

			deltaHappiness[i] += happinessR + happinessL;
		}
	}

	totalHappiness = -1000;
	for( var i = 0; i < deltaHappiness.length; i++ )
	{
		if( deltaHappiness[i] > totalHappiness )
		{
			totalHappiness = deltaHappiness[i];
		}
	}
	output = totalHappiness;
	return output;
}


var numericChars = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
];
function isNumeric( c )
{
	if( numericChars.indexOf( c ) >= 0 )
		return true;
	return false;
}


function GeneratePermutations( len )
{
	var permutations = [];
	permutations[0] = [];
	for( var i = 0; i < len; i++ )
	{
		permutations[0][i] = i;
	}

	// var len = permutations[0].length;
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
	return permutations;
}