function item(index) {
    return $("#li" + index);
}

function update_command() {
    var command = "?vote";
    
    $(".items li").each(function(index) {
        if (item(index).val()) {
            command += " " + item(index).val() + ";";
        }
    });
    
    $(".command").val(command);
}

function save_storage(event) {
    var index = parseInt(event.target.id.slice(2));
    localStorage.setItem("li" + index, item(index).val());
}

function load_storage() {
    $(".items li").each(function(index) {
        item(index).val(localStorage.getItem("li" + index));
    });
}

function swap_values(e1, e2) {
    var e2_value = e2.val();
    e2.val(e1.val());
    e1.val(e2_value);
}

function handle_swap(event) {
    var down = event.keyCode == 40,
        up = event.keyCode == 38
    
    if (!up && !down)
        return
    
    var e = $("#" + event.target.id),
        index = parseInt(event.target.id.slice(2)),
        next;
    
    if ((down && index >= 14) || (up && index <= 0))
        return
    
    next = item(index + (down ? 1 : -1));
    swap_values(e, next);
    next.focus();
    update_command();
}

function copy_command() {
    $(".command").focus().select();
    document.execCommand("copy");
    save_storage();
}

$(document).ready(function() {
    load_storage();
    update_command();
    
    $(".items").on("input", update_command);
    $(".items").on("focusout", save_storage);
    $(".items").on("keyup", handle_swap);
    
    $("#copy").on("click", copy_command);
    $(".command").on("click", copy_command);
});

