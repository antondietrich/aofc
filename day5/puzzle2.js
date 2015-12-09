function SolverProcedure( input )
{
	var output = 0;
	var niceCount = 0;

	var strings = input.split( "\n" );
	for( var i = 0; i < strings.length; i++ )
	{
		if( IsNiceString( strings[i] ) )
		{
			niceCount++;
		}
	}

	output = niceCount;
	return output;
}

var vovels = "aeiou";
var restrictedStrings = [ "ab", "cd", "pq", "xy" ];

function GetPairString( pair )
{
	return pair[0] + pair[1];
}

function IsNiceString( s )
{
	var hasDuplicatePairs = false;
	var hasNiceRepetition = false;
	var pairOffsetRecords = {};
	var pair = [ "", "" ];

	for( var i = 0; i < s.length; i++ )
	{
		if( i == 0 )
		{
			pair[1] = s[i];
		}
		else
		{
			pair[0] = pair[1];
			pair[1] = s[i];

			if( !pairOffsetRecords[ GetPairString( pair ) ] )
			{
				pairOffsetRecords[ GetPairString( pair ) ] = i;
			}
			else
			{
				if( i - pairOffsetRecords[ GetPairString( pair ) ] >= 2 )
				{
					hasDuplicatePairs = true;
				}
			}
		}
		if( i >= 2 )
		{
			if( s[i] === s[i-2] )
			{
				hasNiceRepetition = true;
			}
		}
	}

	if( hasDuplicatePairs && hasNiceRepetition )
	{
		return true;
	}

	return false;
}