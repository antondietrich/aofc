function SolverProcedure( input )
{
	var output = 0;

	var symbolCount = 0;
	// var byteCount = 0;
	var encodedCount = 0;

	var lines = input.split( "\n" );
	for( var i = 0; i < lines.length; i++ )
	{
		symbolCount += lines[i].length;
		var encoded = Encode( lines[i] );
		encodedCount += encoded.length;
	}

	output = encodedCount - symbolCount;
	return output;
}

function Encode( s )
{
	var encoded = "\"";
	for( var i = 0; i < s.length; i++ )
	{
		switch( s[i] )
		{
			case "\\":
				encoded += "\\\\";
				break;
			case "\"":
				encoded += "\\\"";
				break;
			default:
				encoded += s[i];
				break;
		}
	}
	return encoded + "\"";
}