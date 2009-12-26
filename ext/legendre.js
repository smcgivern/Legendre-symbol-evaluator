$(document).ready(function() {
	$('#evaluate').click(evaluateLegendre);
});

var pow = Math.pow;
function variable(name) { return parseInt($('#' + name).val(), 10); }
function mod(n, m) { return (n - Math.floor(n / m) * m); }
function isInt(n) { return (n == Math.floor(n)); }
function isSquare(n) { return isInt(Math.sqrt(n)); }
function isComposite(n) { return !(isOddPrime(n) || ((0 <= n) && (n <= 2))); }
function isOddPrime(n) { return (isPrime(n) && n != 2); }

function isPrime(n) {
	if ((n < 3) || (mod(n, 2) == 0)) { return (n == 2); }

	for (var i = 3; n / i >= i; i += 2) {
		if (mod(n, i) == 0) { return false; }
	}

	return true;
}

function primeFactors(n) {
	var fs = new Array();

	if (isPrime(n)) { return [n]; }
	if (n < 0) { fs.push(-1); n = -n; }

	for (var i = 2; n / i >= 1; i++) {
		if (isInt(n / i) && isPrime(i)) {
			for (var j = 1; n >= pow(i, j); j++) {
				if (mod(n, pow(i, j)) == 0) { fs.push(i); }
			}
		}
	}

	return fs;
}

var steps = [
	{
		'id': 'p-odd-prime',
		'check': function (x, y) { return !isOddPrime(y); },
		'result': function (x, y) { return [0, 0]; }
	},
	{
		'id': 'a-not-congruent-p',
		'check': function (x, y) { return (mod(x, y) == 0) },
		'result': function (x, y) { return [0, 0]; }
	},
	{
		'id': 'congruent-numbers',
		'check': function (x, y) { return ((x > y) || (x < -1)); },
		'result': function (x, y) { return [mod(x, y), y]; }
	},
	{
		'id': 'square-numbers',
		'check': function (x, y) { return isSquare(x); },
		'result': function (x, y) { return [1, y]; }
	},
	{
		'id': 'composite-numbers',
		'check': function (x, y) { return isComposite(x); },
		'result': function (x, y) { return [primeFactors(x), y]; }
	},
	{
		'id': 'quadratic-character--1',
		'check': function (x, y) { return ((x == -1) || (x == y - 1)); },
		'result': function (x, y) { return [pow(-1, (x - 1) / 2), y]; }
	},
	{
		'id': 'quadratic-character-2',
		'check': function (x, y) { return (x == 2); },
		'result': function (x, y) {	return [pow(x, (pow(x, 2) - 1) / 8), y]; }
	},
	{
		'id': 'law-quadratic-reciprocity-1',
		'check': function (x, y) {
			return (isPrime(x) && isPrime(y) &&
					(mod(x, 4) == 1 || mod(y, 4) == 1)
				   );
		},
		'result': function (x, y) {	return [y, x]; }
	},
	{
		'id': 'law-quadratic-reciprocity-1',
		'check': function (x, y) {
			return (isPrime(x) && isPrime(y) &&
					(mod(x, 4) == 3 && mod(y, 4) == 3)
				   );
		},
		'result': function (x, y) {	return [[-1, y], x]; }
	}
];

function legendreStep(a, p) {
	for (var i = 0; i < steps.length; i++) {
		var step = steps[i];

		if (step.check(a, p)) {
			return {'id': step.id, 'next': step.result(a, p)};
		}
	}
}

function evaluateLegendre() {
	var results = evaluationSteps(variable('x'), variable('y'));

	if (result == [0, 0]) {
		// error
	}

	if ($('#results').length == 0) {
		$('#form').after('<ol id="results"></ol>');
	}
}
