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

function item(index) {
    return $("#li" + index);
}

function update_command() {
    var command = "!vote";
    
    $(".items li").each(function(index) {
        if (item(index).val()) {
            command += " " + item(index).val() + ";";
        }
    });
    
    $(".command").val(command);
}

function save_storage() {
    $(".items li").each(function(index) {
        localStorage.setItem("li" + index, item(index).val());
    });
}

function load_storage() {
    $(".items li").each(function(index) {
        item(index).val(localStorage.getItem("li" + index));
    });
}

$(document).ready(function() {
    load_storage();
    
    $(".items").on("input", update_command);
    $(".items").on("focusout", save_storage);
    
    $("#copy").on("click", function() {
        $(".command").select();
        document.execCommand("copy");
        save_storage();
    });
});

