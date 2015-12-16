function SolverProcedure( input )
{
	var lines = input.split( "\n" );
	var deer = [];

	for( var i = 0; i < lines.length; i++ )
	{
		// remove trailing dot
		lines[i] = lines[i].substr( 0, lines[i].length - 1 );

		var parts = lines[i].split( " can fly " );
		var deerName = parts[0];


		var token = "";
		var t = 0;
		while( isNumeric( parts[1][t] ) )
		{
			token += parts[1][t];
			t++;
		}

		var deerSpeed = parseInt( token );

		token = "";
		t = parts[1].indexOf( "for " ) + 4;
		while( isNumeric( parts[1][t] ) )
		{
			token += parts[1][t];
			t++;
		}
		var deerActivePerioid = parseInt( token );

		token = "";
		t = parts[1].lastIndexOf( "for " ) + 4;
		while( isNumeric( parts[1][t] ) )
		{
			token += parts[1][t];
			t++;
		}
		var deerRestPerioid = parseInt( token );


		deer.push( { name: deerName, speed: deerSpeed, active: deerActivePerioid, rest: deerRestPerioid } );
	}

	var deerTracker = {};
	for( var i = 0; i < deer.length; i++ )
	{
		deerTracker[ deer[i].name ] = { activeCounter: 0, restCounter: 0, isResting: false, distance: 0 };
	}

	var timeToGo = 2503;

	for( var second = 0; second < timeToGo; second++ )
	{
		for( var i = 0; i < deer.length; i++ )
		{
			var d = deer[i];
			if( !deerTracker[ d.name ].isResting )
			{
				deerTracker[ d.name ].distance += d.speed;
				deerTracker[ d.name ].activeCounter++;
				if( deerTracker[ d.name ].activeCounter == d.active )
				{
					deerTracker[ d.name ].isResting = true;
				}
			}
			else
			{
				deerTracker[ d.name ].restCounter++;
				if( deerTracker[ d.name ].restCounter == d.rest )
				{
					deerTracker[ d.name ].restCounter = 0;
					deerTracker[ d.name ].activeCounter = 0;
					deerTracker[ d.name ].isResting = false;
				}
			}
		}
	}

	var winningDistance = 0;
	for( var i = 0; i < deer.length; i++ )
	{
		if( deerTracker[ deer[i].name ].distance > winningDistance )
			winningDistance = deerTracker[ deer[i].name ].distance;
	}


	var output = winningDistance;
	return output;
}

var numericChars = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
];
function isNumeric( c )
{
	if( numericChars.indexOf( c ) >= 0 )
		return true;
	return false;
}