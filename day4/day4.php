<?php

$key = $_GET[ 'key' ];
$num = $_GET[ 'num' ];
$suffix = 0;

for( ;; )
{
	$hash = md5( $key.$suffix );
	$result = true;

	for( $i = 0; $i < $num; $i++ )
	{
		if( $hash[$i] != '0' )
		{
			$result = false;
			break;
		}
	}

	if( $result )
	{
		break;
	}

	$suffix++;
}

echo $suffix;