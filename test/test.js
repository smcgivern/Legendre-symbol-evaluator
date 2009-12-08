// http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays/1773172#1773172
function arrayEqual(x, y) {
    if (x.length != y.length) { return false; }

    var a = x.sort();
    var b = y.sort();

    for (var i = 0; b[i]; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};

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
		assert(arrayEqual(primeFactors(4), [2, 2]));
    }},
});
