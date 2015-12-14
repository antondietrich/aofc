function SolverProcedure( input )
{
	var output = 0;

	input = input.trim();
	var numIterations = 40;
	for( var i = 0; i < numIterations; i++ )
	{
		input = LookAndSay( input );
	}

	output = input.length;
	return output;
}

function LookAndSay( s )
{
	var result = "";

	var currentChar = "";
	var lastChar = "";
	var currentCount = 0;
	for( var i = 0; i < s.length; i++ )
	{
		currentChar = s[i];
		if( currentChar != lastChar )
		{
			if( currentCount )
			{
				result += "" + currentCount + "" + lastChar;
				currentCount = 0;
			}
		}
		lastChar = currentChar;
		++currentCount;
	}

	result += "" + currentCount + "" + lastChar;

	return result;
}