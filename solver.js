window.onload = Init;

function Init()
{
	if( !SolverProcedure )
	{
		return;
	}

	var input = document.getElementById( "input" );
	// ProcessFile( e, SolverProcedure );
	Print( SolverProcedure( input.innerText ) );
}

function Print( text )
{
	var output = document.getElementById( "output" );
	output.innerHTML = text;
}

function ProcessFile( e, callback )
{
	var blob = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function( e ) {
		Print( callback( e.target.result ) );
	}
	reader.readAsText( blob );
}