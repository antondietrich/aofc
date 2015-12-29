function SolverProcedure( input )
{
	var lines = input.split( "\n" );
	var set = [];
	for( var i = 0; i < lines.length; i++ )
	{
		if( lines[i].length == 0 )
			continue;
		set[i] = parseInt( lines[i] );
	}

	var targetSum = 150;

	var doLoop = true;
	var numCombos = 0;
	var combinationLength = 1;
	var combination = InitCombination( combinationLength );

	for( ;; )
	{
		if( GetSum( combination, set ) == targetSum )
		{
			var combo = "";
			for( var i = 0; i < combination.length; i++ )
			{
				combo += set[ combination[i] ] + " + ";

			}
			console.log( combo );
			numCombos++;
		}


		if( !NextCombination( combination, set.length ) )
		{
			combinationLength++;
			combination = InitCombination( combinationLength );
		}

		if( combinationLength > set.length )
			break;
	}

	var output = numCombos;
	return output;
}

function GetSum( combination, set )
{
	var sum = 0;
	for( var i = 0; i < combination.length; i++ )
	{
		sum += set[ combination[i] ];
	}
	return sum;
}

function InitCombination( length )
{
	var combination = [];
	for( var i = 0; i < length; i++ )
	{
		combination[i] = i;
	}
	return combination;
}

function NextCombination( combination, n )
{
	var k = combination.length;
	for( var i = k - 1; i >= 0; i-- )
	{
		if( combination[i] + 1 <= n - (k-i) )
		{
			combination[i] += 1;
			break;
		}
		else if( i == 0 )
		{
			return false;
		}
	}

	// reset tail
	var add = 1;
	for( var t = i + 1; t < k; t++ )
	{
		combination[t] = combination[i] + add;
		add++;
	}

	return combination;
}
