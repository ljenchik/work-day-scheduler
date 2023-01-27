let currentDayEl= $("#currentDay");
currentDayEl.text(moment().format('LLLL').split(' ').slice(0,4).join(' '));

for (let i = 9; i < 18; i++) {
    if (i < 12) {
        $("#time").append($("<p>").text(i + 'am').addClass('p-2'));
    }
    else {
        $("#time").append($("<p>").text(i + 'pm').addClass('p-2'));
    }
    $("#task").append($("<p>").addClass('p-2'));

    let icon = $("<i>").addClass("fa-solid fa-calendar-check");
    $("isCompleted").append($("<p>"));
}
