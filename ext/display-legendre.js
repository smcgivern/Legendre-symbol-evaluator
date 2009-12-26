$(document).ready(function() {
    $('#form').submit(displayLegendre);
});

function e(n) { return (n > 0 ? '= ' : ''); }
function p(r) { return $.makeArray(r).join(' &#215; '); }
function variable(e) { return parseInt($('#' + e).val(), 10); }
function legendreSymbol(x, y) { return '(' + p(x) + ' | ' + y + ')'; }

function displayLegendre() {
    var x = variable('x');
    var y = variable('y');
    var results = allLegendreSteps(x, y);
    var element = $('#results');
    var answer = $('<p></p>');

    answer.attr('id', 'answer');
    answer.append(legendreSymbol(x, y) + ' = '
                  + last(results).next[0]);

    element.empty();
    element.append('<h3>Solution</h3>');
    element.append(answer);
    element.append('<h4>Steps</h4>');
    attachResultsSublist(element, results);
}

function attachResultsSublist(parent, results) {
    var element = $('<ol></ol>');
	element.addClass('steps');

    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var item = $('<li></li>');

        item.addClass(result.id);
        item.attr('title', $('#' + result.id).text());

		item.unbind();
        item.click(function() {
            $('#' + $(this).attr('class')).effect('highlight', {}, 3000);
        });

        if ($.isArray(result)) {
            attachResultsSublist(item, result);
        } else {
			if (result.next[0] == 0) {
				item.append('Check failed: ' + item.attr('title')) + '.';
			} else if (result.next[1] == 0) {
                item.append(e(i) + p(result.next[0]));
            } else {
                item.append(e(i) + legendreSymbol(result.next[0],
                                                  result.next[1]));
            }
        }

        element.append(item);
    }

    parent.append(element);
}
