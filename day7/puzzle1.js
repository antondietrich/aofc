var GATES = [
	"AND",
	"OR",
	"NOT",
	"LSHIFT",
	"RSHIFT",
];

var ST_LITERAL = 0;
var ST_REFERENCE = 1;
var ST_EXPRESSION = 2;

var signals = {};

function SolverProcedure( input )
{
	var output = 0;
	var lines = input.split( "\n" );

	for( var i = 0; i < lines.length; i++ )
	{
		if( lines[i].length == 0 )
			continue;
		var instruction = ParseLine( lines[i] );
		signals[ instruction.output ] = { inputs: instruction.inputs, gate: instruction.gate, value: -1, resolved: false };
	}

	for( wire in signals )
	{
		Execute( wire );
//		console.log( wire + ": " + signals[ wire ] );
	}

	output = signals[ "a" ];
	return output;
}

function Execute( index )
{
	// literal
	if( !isNaN( parseInt( index ) ) )
	{
		return parseInt( index );
	}

	var signal = signals[ index ];

	// resolved signal
	if( !isNaN( parseInt( signal ) ) )
	{
		return parseInt( signal );
	}

	// expression
	switch( signal.gate )
	{
		case "":
			value = Execute( signal.inputs[0] );
			break;
		case "NOT":
			value = ( ~Execute( signal.inputs[0] ) ) & 65535;
			break;
		case "AND":
			value = Execute( signal.inputs[0] ) & Execute( signal.inputs[1] );
			break;
		case "OR":
			value = Execute( signal.inputs[0] ) | Execute( signal.inputs[1] );
			break;
		case "LSHIFT":
			value = ( Execute( signal.inputs[0] ) << Execute( signal.inputs[1] ) ) & 65535;
			break;
		case "RSHIFT":
			value = ( Execute( signal.inputs[0] ) >> Execute( signal.inputs[1] ) ) & 65535;
			break;
	}

	signals[ index ] = value;
	return value;

}

function ParseLine( line )
{
	var input = line.split( " -> " )[0];
	var output = line.split( " -> " )[1];
	var gate = "";
	var inputs = [];
	input = input.split( " " );

	for( var i = 0; i < input.length; i++ )
	{
		if( GATES.indexOf( input[i] ) >= 0 )
		{
			gate = input[i];
		}
		else
		{
			inputs.push( input[i] );
		}
	}
	return {
		inputs: inputs,
		gate: gate,
		output: output
	};
}