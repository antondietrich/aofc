var ingredients = {};



function SolverProcedure( input )
{
	input = input.trim();
	var lines = input.split( "\n" );

	for( var i = 0; i < lines.length; i++ )
	{
		var parts = lines[i].split( ": " );
		ingredients[ parts[0] ] = {};

		parts[1] = parts[1].split( ", " );
		for( var t = 0; t < parts[1].length; t++ )
		{
			var property = parts[1][t].split( " " )[0];
			var value = parseInt( parts[1][t].split( " " )[1] );

			ingredients[ parts[0] ][ property ] = value;
		}
	}

	var numIngredients = lines.length;

	var recipe = [];
	var recipeIndex = 0;
	for( var name in ingredients )
	{
		recipe[ recipeIndex++ ] = { name: name, amount: 100 / numIngredients };
	}

	// find maximum
	var score = GetScore( recipe );
	var maxDelta = 1;
	var prevDelta = 0;
	while( maxDelta > 0 )
	{
		var bestSub = 0;
		var bestAdd = 0;
		prevDelta = maxDelta;
		maxDelta = 0;


		for( var t = 0; t < numIngredients; t++ )
		{
			recipe[ t ].amount--;
			for( var k = 0; k < numIngredients; k++ )
			{
				if( k != t )
				{
					recipe[ k ].amount++;

					var newScore = GetScore( recipe );
					if( (newScore - score) > maxDelta )
					{
						maxDelta = newScore - score;
						bestSub = t;
						bestAdd = k;
					}

					recipe[ k ].amount--;
				}
			}
			recipe[ t ].amount++;
		}

		recipe[ bestAdd ].amount++;
		recipe[ bestSub ].amount--;
		score = GetScore( recipe );
	}

	score = GetScore( recipe );

	var calories = GetCalories( recipe );
	var calDistance = Math.abs( calories - 500 );

	var topScore = score;
	var topScoreDistance = 0;

	var cutoff = 10000000;

	// find maximum
	while( calDistance != 0 )
	{
		var bestSub = 0;
		var bestAdd = 0;

		if( !(--cutoff) )
		{
			alert( "Cutoff" );
			break;
		}

		topScoreDistance = 10000000;

		for( var t = 0; t < numIngredients; t++ )
		{
			recipe[ t ].amount--;
			for( var k = 0; k < numIngredients; k++ )
			{
				if( k != t )
				{
					recipe[ k ].amount++;

					var newDistance = Math.abs( GetCalories( recipe ) - 500 );
					var newTopScoreDistance = Math.abs( GetScore( recipe ) - topScore );

					// only the changes that bring us closet to calories target pass
					if( newDistance < calDistance )
					{
						// pick the one among them, that changes the score the least
						if( newTopScoreDistance <= topScoreDistance )
						{
							bestSub = t;
							bestAdd = k;

							topScoreDistance = newTopScoreDistance;

							calDistance = newDistance;
						}
					}
					recipe[ k ].amount--;
				}
			}
			recipe[ t ].amount++;
		}

		recipe[ bestAdd ].amount++;
		recipe[ bestSub ].amount--;

		if( bestAdd == bestSub )
		{
			alert( "No solution: " + bestAdd );
			break;
		}
	}

	var output = GetScore( recipe );
	return output;
}

function GetCalories( recipe )
{
	var calories = 0;
	for( var i = 0; i < recipe.length; i++ )
	{
		calories += ingredients[ recipe[i].name ].calories * recipe[i].amount;
	}
	return calories;
}


function GetScore( recipe )
{
	var capacity = 0;
	var durability = 0;
	var flavor = 0;
	var texture = 0;

	for( var i = 0; i < recipe.length; i++ )
	{
		capacity += ingredients[ recipe[i].name ].capacity * recipe[i].amount;
		durability += ingredients[ recipe[i].name ].durability * recipe[i].amount;
		flavor += ingredients[ recipe[i].name ].flavor * recipe[i].amount;
		texture += ingredients[ recipe[i].name ].texture * recipe[i].amount;

	}
	if( capacity < 0 )
		capacity = 0;
	if( durability < 0 )
		durability = 0;
	if( flavor < 0 )
		flavor = 0;
	if( texture < 0 )
		texture = 0;

	return capacity * durability * flavor * texture;
}
