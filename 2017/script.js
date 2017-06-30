// https://stackoverflow.com/a/987376
function select_text(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function update_command() {
    var command = "!vote";
    
    for (i = 1; i <= 10; i++) {
        if ($("#li" + i).val()) {
            command += " " + $("#li" + i).val() + ";";
        }
    }
    
    $(".command").val(command);
    $(".command").style.size = command.length;
}

$(document).ready(function() {
    $(".items").each(function() {
        var e = $(this);
        e.on("input", update_command);
    });
    
    $("#copy").on("click", function() {
        $(".command").select();
        document.execCommand("copy");
    });
});

update_command();

