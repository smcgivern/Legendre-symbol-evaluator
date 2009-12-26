// http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays/1773172#1773172
function arrayEqual(x, y) {
    if (x.length != y.length) { return false; }

    var a = x.sort();
    var b = y.sort();

    for (var i = 0; b[i]; i++) {
		if (a[i].constructor == Array && b[i].constructor == Array) {
			if (!arrayEqual(a[i], b[i])) { return false ;}
		} else {
			if (a[i] !== b[i]) { return false; }
		}
    }

    return true;
};

function DumpObject(obj)
{
  var od = new Object;
  var result = "";
  var len = 0;

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        value = "[ " + DumpObject(value).dump + " ]";
      }
      else
      {
        var ood = DumpObject(value);
        value = "{ " + ood.dump + " }";
      }
    }
    result += "'" + property + "' : " + value + ", ";
    len++;
  }
  od.dump = result.replace(/, $/, "");
  od.len = len;
  od.nil = (obj == null);

  return od;
}



new Test.Unit.Runner({
    setup: function() {
    },

    teardown: function() {
    },

    testMod: function() { with(this) {
        assert(mod(1, 2) == 1);
        assert(mod(1, 3) == 1);
        assert(mod(3, 1) == 0);

    	assert(mod(-3, 1) == 0);
    	assert(mod(-10, 5) == 0);
    	assert(mod(-10, 17) == 7);

    	assert(mod(3, -1) == 0);
    	assert(mod(10, -5) == 0);
    	assert(mod(10, -17) == -7);

    	assert(mod(-3, -1) == 0);
    	assert(mod(-10, -5) == 0);
    	assert(mod(-10, -17) == -10);
    }},

    testIsInt: function() { with(this) {
        assert(isInt(0));
        assert(isInt(1));
        assert(isInt(-1));

        assert(!isInt(0.1));
        assert(!isInt(-0.1));
    }},

    testIsSquare: function() { with(this) {
        assert(isSquare(0));
        assert(isSquare(1));
        assert(isSquare(144));

        assert(!isSquare(2));
        assert(!isSquare(-1));
    }},

    testIsComposite: function() { with(this) {
        assert(isComposite(4));
        assert(isComposite(9));
        assert(isComposite(15));

        assert(!isComposite(0));
        assert(!isComposite(1));
        assert(!isComposite(29));
    }},

    testIsOddPrime: function() { with(this) {
        assert(isOddPrime(5));
        assert(isOddPrime(7));
        assert(isOddPrime(29));

        assert(!isOddPrime(0));
        assert(!isOddPrime(1));
        assert(!isOddPrime(2));
        assert(!isOddPrime(-5));
    }},

    testIsPrime: function() { with(this) {
        assert(isPrime(2));
        assert(isPrime(5));
        assert(isPrime(7));
        assert(isPrime(29));

        assert(!isPrime(0));
        assert(!isPrime(1));
        assert(!isPrime(-5));
    }},

    testPrimeFactors: function() { with(this) {
		assert(arrayEqual(primeFactors(1), []));
		assert(arrayEqual(primeFactors(4), [2, 2]));
		assert(arrayEqual(primeFactors(15), [3, 5]));
		assert(arrayEqual(primeFactors(28), [2, 2, 7]));
    }},

	testLegendreStep: function() { with(this) {
		var tests = [
			{'a': 1, 'p': 1, 'id': 'p-odd-prime', 'next': [0, 0]},
			{'a': 1, 'p': 2, 'id': 'p-odd-prime', 'next': [0, 0]},
			{
				'a': 3, 'p': 3,
				'id': 'a-not-congruent-p', 'next': [0, 0]
			},
			{
				'a': 13, 'p': 13,
				'id': 'a-not-congruent-p', 'next': [0, 0]
			},
			{
				'a': 138, 'p': 139,
				'id': 'quadratic-character--1', 'next': [-1, 0]
			},
			{
				'a': -1, 'p': 149,
				'id': 'quadratic-character--1', 'next': [1, 0]
			},
			{
				'a': 92, 'p': 3,
				'id': 'congruent-numbers', 'next': [2, 3]
			},
			{
				'a': -10, 'p': 3,
				'id': 'congruent-numbers', 'next': [2, 3]
			},
			{
				'a': 4, 'p': 7,
				'id': 'square-numbers', 'next': [1, 0]
			},
			{
				'a': 144, 'p': 149,
				'id': 'square-numbers', 'next': [1, 0]
			},
			{
				'a': 8, 'p': 13,
				'id': 'composite-numbers', 'next': [[2, 2, 2], 13]
			},
			{
				'a': 28, 'p': 149,
				'id': 'composite-numbers', 'next': [[2, 2, 7], 149]
			},
			{
				'a': 2, 'p': 5,
				'id': 'quadratic-character-2', 'next': [-1, 5]
			},
			{
				'a': 2, 'p': 137,
				'id': 'quadratic-character-2', 'next': [1, 137]
			},
			{
				'a': 5, 'p': 7,
				'id': 'law-quadratic-reciprocity-1', 'next': [7, 5]
			},
			{
				'a': 3, 'p': 13,
				'id': 'law-quadratic-reciprocity-1', 'next': [13, 3]
			},
			{
				'a': 3, 'p': 7,
				'id': 'law-quadratic-reciprocity-2',
				'next': [[-1, 7], 3]
			},
			{
				'a': 83, 'p': 103,
				'id': 'law-quadratic-reciprocity-2',
				'next': [[-1, 103], 83]
			}
		]

		for (var i = 0; i < tests.length; i++) {
			var test = tests[i];
			var result = legendreStep(test.a, test.p);

			assert(result.id == test.id);
			assert(arrayEqual(result.next, test.next));
		}
	}},

    testAllLegendreSteps: function() { with(this) {
		var tests = [
			[[1, 1], [0, 0]],
			[[1, 2], [0, 0]],
			[[9, 3], [0, 0]],
			[[1, 3], [1, 0]],
			[[9, 19], [1, 0]],
			[[12, 71], [1, 0]],
			[[83, 97], [-1, 0]],
		]

		for (var i = 0; i < tests.length; i++) {
			var test = tests[i];
			var result = allLegendreSteps(test[0][0], test[0][1]);

			if (!arrayEqual(last(result).next, test[1])) { alert(DumpObject(result).dump); }
			assert(arrayEqual(last(result).next, test[1]));
		}
    }},
});
