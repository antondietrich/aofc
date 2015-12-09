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
	var hasDuplicates = false;
	var vovelCount = 0;

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

			if( restrictedStrings.indexOf( GetPairString( pair ) ) >= 0 )
			{
				return false;
			}

			if( pair[1] == pair[0] )
			{
				hasDuplicates = true;
			}
		}

		if( vovels.indexOf( s[i] ) >= 0 )
		{
			vovelCount++;
		}
	}

	if( hasDuplicates && (vovelCount >= 3) )
	{
		return true;
	}

	return false;
}