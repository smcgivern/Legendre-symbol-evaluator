$(document).ready(function() {
	$('#evaluate').click(evaluateLegendre);
});

function variable(name) { return parseInt($('#' + name).val(), 10); }

var steps = [
	{
		'id': 'p-odd-prime',
		'check': function (x, y) { return isOddPrime(y); },
		'result': function (x, y) { return [0, 0]; }
	},
	{
		'id': 'a-not-congruent-p',
		'check': function (x, y) { return (x % y != 0) },
		'result': function (x, y) { return [0, 0]; }
	},
	{
		'name': 'Property (a)',
		'check': function (x, y) { return (x > y); },
		'result': function (x, y) { return [x % y, y]; }
	},
	{
		'name': 'Property (b)',
		'check': function (x, y) { return isSquare(a); },
		'result': function (x, y) { return [1, y]; }
	},
	{
		'name': 'Property (c)',
		'check': function (x, y) { return isComposite(a); },
		'result': function (x, y) { return [1, y]; }
	},
];

function evaluateLegendre() {
	x = variable('x');
	x = variable('y');

	if ($('#results').length == 0) {
		$('#form').after('<ol id="results"></ol>');
	}
}
