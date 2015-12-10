var STRIDE = 1000;
var COMMAND_TURN_ON = 0;
var COMMAND_TURN_OFF = 1;
var COMMAND_TOGGLE = 2;

function SolverProcedure( input )
{
    var output = 0;
    var brightness = 0;

    var lights = new Array( STRIDE*STRIDE );
    var numLights = lights.length;
    for( var i = 0; i < numLights; i++ )
    {
        lights[i] = 0;
    }

    var lines = input.split( "\n" );
    for( var i = 0; i < lines.length; i++ )
    {
        var command = GetCommand( lines[i] );
        var range = GetRange( lines[i] );
        switch( command )
        {
            case COMMAND_TURN_ON:
                SetLights( lights, range, 1 );
                break;
            case COMMAND_TURN_OFF:
                SetLights( lights, range, -1 );
                break;
            case COMMAND_TOGGLE:
                SetLights( lights, range, 2 );
                break;
        }
    }

    for( var y = 0; y < STRIDE; y++ )
    {
    	for( var x = 0; x < STRIDE; x++ )
    	{
    		brightness += lights[ x + y*STRIDE ];
    	}
    }

    output = brightness;
    return output;
}

function SetLights( lights, range, state )
{
    for( var y = range.min.y; y <= range.max.y; y++ )
    {
	    for( var x = range.min.x; x <= range.max.x; x++ )
	    {
            lights[x + y*STRIDE] = Math.max( 0, lights[x + y*STRIDE] + state );
	    }
    }
}

function ToggleLights( lights, range )
{
	for( var y = range.min.y; y <= range.max.y; y++ )
    {
	    for( var x = range.min.x; x <= range.max.x; x++ )
	    {
            lights[x + y*STRIDE] = !lights[x + y*STRIDE];
	    }
    }
}

function GetCommand( line )
{
    if( line.indexOf( "toggle" ) == 0 )
            return COMMAND_TOGGLE;
    if( line.indexOf( "turn on" ) == 0 )
        return COMMAND_TURN_ON;
    if( line.indexOf( "turn off" ) == 0 )
        return COMMAND_TURN_OFF;
}

function GetRange( line )
{
	var i = 0;
	for( ;; )
	{
		if( !isNaN( line[ i ] ) && line[ i ] !== " " )
			break;
		++i;
	}

	var rangeString = line.substr( i );
	rangeString = rangeString.split( "through" );
	var rangeMin = rangeString[0].split( ',' );
	var rangeMax = rangeString[1].split( ',' );
	var range = { min: { x: parseInt( rangeMin[0] ), y: parseInt( rangeMin[1] ) },
				  max: { x: parseInt( rangeMax[0] ), y: parseInt( rangeMax[1] ) } };

	return range;
}
