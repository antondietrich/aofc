function SolverProcedure( input )
{
	var output = 0;

	var location = [];
	location[0] = { x: 0, y: 0 };
	location[1] = { x: 0, y: 0 };
	var visitedHouses = [];

	// first house
	visitedHouses.push( { x: location[0].x, y: location[0].y } );
	//visitedHouses.push( { x: location[1].x, y: location[1].y } );

	for( var i = 0; i < input.length; i++ )
	{
		var locationID = i % 2;

		switch( input[i] )
		{
			case '^':
				location[locationID].y++;
			break;
			case 'v':
				location[locationID].y--;
			break;
			case '>':
				location[locationID].x++;
			break;
			case '<':
				location[locationID].x--;
			break;
		}

		var alreadyVisited = false;
		for( var t = 0; t < visitedHouses.length; t++ )
		{
			if( visitedHouses[t].x == location[locationID].x &&
			    visitedHouses[t].y == location[locationID].y )
			{
				alreadyVisited = true;
				break;
			}
		}

		if( !alreadyVisited )
		{
			visitedHouses.push( { x: location[locationID].x, y: location[locationID].y } );
		}
	}

	output = visitedHouses.length;

	return output;
}
