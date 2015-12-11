function SolverProcedure( input )
{
	var output = 0;

	var symbolCount = 0;
	var byteCount = 0;

	var lines = input.split( "\n" );
	for( var i = 0; i < lines.length; i++ )
	{
		symbolCount += lines[i].length;
		byteCount += CountBytes( lines[i] );
	}

	output = symbolCount - byteCount;
	return output;
}

var stateEscape = 0;

function CountBytes( string )
{
	var count = 0;
	for( var i = 1; i < string.length - 1; i++ )
	{
		var c = string[i];

		if( stateEscape == 0 && c == "\\" )
		{
			count++;
			stateEscape = 1;
			continue;
		}

		if( stateEscape == 1 )
		{
			if( c == "\\" )
			{
				// count++;
				stateEscape = 0;
				continue;
			}

			if( c == "\"" )
			{
				// count++;
				stateEscape = 0;
				continue;
			}

			if( c == "x" )
			{
				// count++;
				i += 2;
				stateEscape = 0;
				continue;
			}
		}

		count++;
	}

	return count;
}