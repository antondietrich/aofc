window.onload = Init;

function Init()
{
	var input = document.getElementById( "input" );
	input.onchange = function( e ) {
		ProcessFile( e, DoTask );
	};
}

function ProcessFile( e, callback )
{
	var blob = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function( e ) {
		callback( e.target.result )
	}
	reader.readAsText( blob );
}

function Print( text )
{
	var output = document.getElementById( "output" );
	output.innerHTML = text;
}

function DoTask( input )
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
	Print( i + 1 );
}
