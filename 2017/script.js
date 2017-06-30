function update_command() {
    var command = "!vote";
    
    for (i = 1; i <= 10; i++) {
        if ($("#li" + i).val()) {
            command += " " + $("#li" + i).val() + ";";
        }
    }
    
    $(".command").text(command);
}

/*for (i = 1; i <= 10; i++) {
    
}*/

$(document).ready(function() {
    $(".items").each(function() {
        var e = $(this);
        e.on("input", update_command);
    });
});

update_command();