var letters = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

function SolverProcedure( input )
{
	var output = "";
	input = input.trim();

	var digits = ToDigits( input );

	var count = 0;
	for( var iteration = 0; ; iteration++ )
	{
		IncrementMod26( digits );

		if( Validate( digits ) )
		{
			count++;
			if( count == 2 )
				break;
		}
	}

	output = ToChars( digits );
	return output;
}

function ToDigits( s )
{
	var result = [];
	for( var i = 0; i < s.length; i++ )
	{
		result[i] = letters.indexOf( s[i] );
	}
	return result;
}

function ToChars( d )
{
	var result = "";
	for( var i = 0; i < d.length; i++ )
	{
		result += letters[ d[i] ];
	}
	return result;
}

function IncrementMod26( digits )
{
	for( var i = digits.length - 1; i >= 0; i-- )
	{
		var overflow = false;

		digits[i] = ( digits[i] + 1 ) % 26;
		if( digits[i] == 0 )
			overflow = true;

		if( !overflow )
			break;
	}
}

var restricted = [
	letters.indexOf( "i" ),
	letters.indexOf( "o" ),
	letters.indexOf( "l" ),
];

function Validate( digits )
{
	var hasIncreasing3 = false;
	for( var i = 0; i < digits.length - 2; i++ )
	{
		if( digits[i] + 1 == digits[i+1] && digits[i+1] + 1 == digits[i+2] )
		{
			hasIncreasing3 = true;
			break;
		}
	}

	var noRestricted = true;
	for( var i = 0; i < digits.length; i++ )
	{
		if( restricted.indexOf( digits[i] ) >= 0 )
		{
			noRestricted = false;
		}
	}

	var twoPairs = false;
	var pairs = [];
	for( var i = 0; i < digits.length - 1; i++ )
	{
		if( digits[i] == digits[i + 1] )
		{
			for( var t = 0; t < pairs.length; t++ )
			{
				if( pairs[t].value != digits[i] && i - pairs[t].offset >= 2 )
				{
					twoPairs = true;
					break;
				}
			}
			pairs.push( { offset: i, value: digits[i] } );
		}
	}


	var result = false;
	if( hasIncreasing3 && noRestricted && twoPairs )
	{
		result = true;
	}
	return result;
}