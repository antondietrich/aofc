var SF_OBJECT = 0;
var SF_ARRAY = 1;

var tree = new Tree();

function Tree()
{
	this.root = null;
	this.top = null;
}

function Node( type )
{
	this.type = type;
	this.isRed = false;
	this.numbers = [];

	this.parent = null;
	this.children = [];
}

function SolverProcedure( input )
{
	var output = 0;

	var currentToken = "";
	var sum = 0;

	var objectScope = 0;
	for( var i = 0; i < input.length; i++ )
	{
		if( isNumeric( input[i] ) )
		{
			currentToken += input[i];
		}
		else
		{
			if( currentToken.length !== 0 )
			{
				tree.top.numbers.push( parseInt( currentToken ) );
				currentToken = "";
			}
		}

		if( input[i] == ":" )
		{
			if( input[i+1] == "\"" )
			{
				i += 2;
				while( input[i] != "\"" )
				{
					currentToken += input[i];
					i++
				}
				if( currentToken == "red" )
				{
					tree.top.isRed = true;
				}
				currentToken = "";
			}
		}

		if( input[i] == "{" || input[i] == "[" )
		{
			var type = input[i] == "{" ? SF_OBJECT : SF_ARRAY;

			if( !tree.root )
			{
				tree.root = new Node( type );
				tree.top = tree.root;
			}
			else
			{
				var node = new Node( type );
				tree.top.children.push( node );
				node.parent = tree.top;
				tree.top = node;
			}
		}

		else if( input[i] == "}" || input[i] == "]" )
		{
			tree.top = tree.top.parent;
		}
	}

//	PropagateRedness( tree.root );

	sum = Count( tree.root );

	output = sum;
	return output;
}

var numericChars = [
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-",
];
function isNumeric( c )
{
	if( numericChars.indexOf( c ) >= 0 )
		return true;
	return false;
}


function Count( node )
{
	var sum = 0;
	if( !node.isRed )
	{
		for( var i = 0; i < node.numbers.length; i++ )
		{
			sum += node.numbers[i];
		}
	}
	for( var i = 0; i < node.children.length; i++ )
	{
		if( node.isRed )
			node.children[i].isRed = node.isRed;
		sum += Count( node.children[i] );
	}
	return sum;
}