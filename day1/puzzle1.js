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
	}

	var output =  floor;
	return output;
}