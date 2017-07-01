var total_players = 15,
    max_index = total_players - 1,
    valid_players;

function item(index) {
    return $("#li" + index);
}

function update_command() {
    var command = "?vote";
    
    $(".items li").each(function(index) {
        var e = item(index)
        if (e.val() && !e.hasClass("invalid")) {
            command += " " + e.val() + ";";
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

function is_duplicate(e) {
    var start_index = parseInt(e[0].id.slice(2));
    
    // Only check duplicates above the current position
    for (var index = 0; index < start_index; index++) {
        if (e.val().toLowerCase() == item(index).val().toLowerCase()) {
            return true;
        }
    }
    
    return false;
}

function validate_input(event) {
    var e = $("#" + event.target.id);
    
    if (!e.val()) {
        if (e.hasClass("invalid"))
            e.removeClass("invalid");
        return;
    }
    
    if (!is_duplicate(e)) {
        for (index in valid_players) {
            if (e.val().toLowerCase() == valid_players[index].toLowerCase()) {
                // Input must be valid
                if (e.hasClass("invalid"))
                    e.removeClass("invalid");
                return true;
            }
        }
    }
    
    if (!e.hasClass("invalid"))
        e.addClass("invalid");
    return false;
}

function swap_values(e1, e2) {
    var e2_value = e2.val();
    e2.val(e1.val());
    e1.val(e2_value);
}

function handle_swap(event) {
    var down = event.keyCode == 40,
        up = event.keyCode == 38;
    
    if (!up && !down)
        return;
    
    var e = $("#" + event.target.id),
        index = parseInt(event.target.id.slice(2)),
        next;
    
    if ((down && index >= max_index) || (up && index <= 0))
        return;
    
    next = item(index + (down ? 1 : -1));
    swap_values(e, next);
    next.focus();
    update_command();
    
    // Also being a moron with hacky solutions
    validate_input({"target": {"id": next[0].id}});
}

function copy_command() {
    $(".command").focus().select();
    document.execCommand("copy");
}

$(document).ready(function() {
    load_storage();
    update_command();
    
    // https://stackoverflow.com/a/14573550
    valid_players = $("#players option").map(function() {
        return this.value;
    }).get();
    
    $(".items li").each(function(index) {
        // Being a real moron and creating a fake event to do the job
        validate_input({"target": {"id": item(index)[0].id}});
    });
    
    $(".items").on("input", function(event) {
        var e = $("#" + event.target.id)
        if (e.hasClass("invalid"))
            e.removeClass("invalid");
        update_command();
    });
    $(".items").on("focusout", function(event) {
        validate_input(event);
        save_storage(event);
        update_command();
    });
    $(".items").on("keyup", function(event) {
        handle_swap(event);
        update_command();
    });
    
    $("#copy").on("click", copy_command);
    $(".command").on("click", copy_command);
});

