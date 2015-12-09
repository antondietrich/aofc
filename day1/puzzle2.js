function SolverProcedure( input )
{
	var floor = 0;
	var i = 0;
	for( ; i < input.length; i++ )
	{
		if( input[i] == '(' )
		{
			floor++;
		}
		else if( input[i] == ')' )
		{
			floor--;
		}

		if( floor == -1 )
			break;
	}

	var output =  i + 1;
	return output;
}