$(document).ready(function() {
    $('#form').submit(displayLegendre);
});

function e(n) { return (n > 0 ? '= ' : ''); }
function p(r) { return $.makeArray(r).join(' &#215; '); }
function variable(e) { return parseInt($('#' + e).val(), 10); }
function legendreSymbol(x, y) { return '(' + p(x) + ' | ' + y + ')'; }

function displayLegendre() {
    var results = allLegendreSteps(variable('x'), variable('y'));
    var element = $('#results');

    element.empty();
    attachResultsSublist(element, results);
}

function attachResultsSublist(parent, results) {
    var element = $('<ol></ol>');

    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var item = $('<li></li>');

        item.addClass(result.id);
        item.attr('title', $('#' + result.id).text());

        item.click(function() {
            $('#' + $(this).attr('class')).effect('highlight', {}, 3000);
        });

        if ($.isArray(result)) {
            attachResultsSublist(item, result);
        } else {
            if (result.next[1] == 0) {
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
