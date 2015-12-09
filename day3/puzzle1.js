function SolverProcedure( input )
{
	var output = 0;

	var location = { x: 0, y: 1 };
	var visitedHouses = [];

	// first house
	visitedHouses.push( { x: location.x, y: location.y } );

	for( var i = 0; i < input.length; i++ )
	{
		switch( input[i] )
		{
			case '^':
				location.y++;
			break;
			case 'v':
				location.y--;
			break;
			case '>':
				location.x++;
			break;
			case '<':
				location.x--;
			break;
		}

		var alreadyVisited = false;
		for( var t = 0; t < visitedHouses.length; t++ )
		{
			if( visitedHouses[t].x == location.x && visitedHouses[t].y == location.y )
			{
				alreadyVisited = true;
				break;
			}
		}

		if( !alreadyVisited )
		{
			visitedHouses.push( { x: location.x, y: location.y } );
		}
	}

	output = visitedHouses.length;

	return output;
}
