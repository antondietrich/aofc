function SolverProcedure( input )
{
	var output = 0;

	var key = "ckczppom";
	var num = "5";

	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/day4/day4.php?key='+key+'&num='+num, false);
	xhr.send();
	output = xhr.responseText;
	return output;
}
