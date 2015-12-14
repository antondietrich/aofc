function SolverProcedure( input )
{
	var output = 0;

	var currentToken = "";
	var sum = 0;

	var objectScope = 0;
	for( var i = 0; i < input.length; i++ )
	{
		if( input[i] == "{" )
		{

		}
		if( isNumeric( input[i] ) )
		{
			currentToken += input[i];
		}
		else
		{
			if( currentToken.length !== 0 )
			{
				sum += parseInt( currentToken );
				currentToken = "";
			}
		}
	}

	output = sum;
	return output;
}

var numericChars = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-",
];
function isNumeric( c )
{
	if( numericChars.indexOf( c ) >= 0 )
		return true;
	return false;
}