$(document).ready(function() {
    $("body").on("change", ".keeptrack", function() {
        $(this).addClass("kepttrack");
    });

    $('th').click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    })
    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index){ return $(row).children('td').eq(index).text() }

    $("body").on("click", ".writetext__insert", function() {
        insertIntoWritetextField($(this).data("insert"));
    });
    $(".writetext").on("input", ".writetext__field", function() {
        loadTextPreview();
    });
    $("body").on("click", ".writetext__copy", function() {
        navigator.clipboard.writeText($(".writetext__field").val().replace(/(\r\n|\n|\r)/gm, ""));
    });
    $("body").on("click", ".js-copymydata", function() {
        navigator.clipboard.writeText($(this).data('tocopy').replace(/(\r\n|\n|\r)/gm, ""));
    });
    $("body").on("click", ".js-markonclick", function() {
        $(".clicked").removeClass("clicked");
        $(this).addClass("clicked");
    });


});

function insertIntoWritetextField(toInsert) {
    let currentValue = $(".writetext__field").val();
    $(".writetext__field").val(currentValue + toInsert);
    loadTextPreview();
    $(".writetext__field").focus();
}

function loadTextPreview() {
    let text = $(".writetext__field").val();
    text = text.replace(/(\r\n|\n|\r)/gm, "");

    const boxHtml = '<div class="writetext__example">';
    const lineHtml = '<div class="writetext__exampleline">';
    const scrollHtml = '<span class="writetext__examplescroll">A</span>';

    let output = boxHtml + lineHtml;
    for(let i = 0; i < text.length; i++) {
        if(text[i] == "\\") {
            let special = text[i];
            i++;
            special += text[i];
            if(special == "\\n") {
                output += "</div>" + lineHtml;
                continue;
            } else if(special == "\\f") {
                output += scrollHtml + "</div>" + lineHtml;
                continue;
            } else if(special == "\\r") {
                output += '</div></div>' + boxHtml + lineHtml;
                continue;
            } else {
                i--;
            }
        }
        output += '<span class="writetext__examplechar">' + text[i] + '</span>';
    }
    output += '</div></div>';

    $(".writetext__exampleholder").html(output);
}