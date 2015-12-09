<?php

$runSolver = false;

if( isset( $_GET['day'] ) && isset( $_GET['puzzle'] ) )
{
	$day = $_GET[ 'day' ];
	$puzzle = $_GET[ 'puzzle' ];

	$dir = "/day$day/";
	$jsFile = "puzzle$puzzle.js";
	$solverPath = $dir . $jsFile;
	$inputPath = dirname( __FILE__ ) . $dir . 'input';

	$runSolver = true;
}

?>


<!DOCTYPE html>
<html>
<head>
	<?php
	$title = '';
	if( $runSolver ) {
		$title = "AOfC day $day";
	}
	else {
		$title = "AOfC home";
	}
	echo "<title>$title</title>";
	?>

	<style type="text/css">
	body {
		font: 14px 'Fira Mono';
	}
	h1 {
		font-size: 16px;
	}
	</style>
	<?php
	if( $runSolver ) {
		echo "<script type='text/javascript' src='$solverPath'></script>";
		echo "<script type='text/javascript' src='solver.js'></script>";
	}
	?>
</head>
<body>
<?php
if( !$runSolver )
{
	for( $day = 1; $day <= 25; $day++ )
	{
		$link1 = 'Puzzle 1';
		$link2 = 'Puzzle 2';
		if( file_exists( "day$day/puzzle1.js" ) )
		{
			$link1 = "<a href='?day=$day&puzzle=1'>Puzzle 1</a>";
		}

		if( file_exists( "day$day/puzzle2.js" ) )
		{
			$link2 = "<a href='?day=$day&puzzle=2'>Puzzle 2</a>";
		}

		echo '<pre>';
		print( "<p>Day $day:\t$link1 &middot; $link2</p>" );
		echo '</pre>';
	}
}
else
{
	echo "<h1>Day $day Puzzle $puzzle</h1>";
	echo '<pre id="input" hidden>';
	echo htmlspecialchars( file_get_contents( $inputPath ) );
	echo "</pre>";
	echo 'Result: <pre id="output" style="display: inline;"></pre>';
	echo '<p><a href="/">Home</a></p>';
}
?>
</body>
</html>