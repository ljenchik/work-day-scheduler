let dayTasks = [];

let currentDayEl = $("#currentDay");
currentDayEl.text(moment().format("LLLL").split(" ").slice(0, 4).join(" "));

let currentHour = moment().hour();
// Append empty rows to the table
let table = $("#projectTable");

function createTable() {

  for (let i = 9; i < 24; i++) {
    // Table row
    let timeblock = $("<tr>").addClass("time-block").attr('data-index', i);

    // Table cells
    let time = $("<td>");
    let task = $("<td>");
    let save = $("<td>");

    // Add hours
    if (i < 12) {
      time.append($("<p>").text(i + " am"));
    } else {
      time.append($("<p>").text(i + " pm"));
    }

    // Add input box for tasks
    let inputEl = $("<input>").attr("data-index", i).addClass("textarea");
    task.append(inputEl);

    // Add icon for saving the task
    save.append('<i class="fa-solid fa-floppy-disk fa-2x"></i>');

    timeblock.append(time);
    timeblock.append(task);
    timeblock.append(save);

    if (currentHour > parseInt(time.text().split(" ")[0])) {
      timeblock.addClass("past");
      inputEl.addClass("past");
    } else if (currentHour === parseInt(time.text().split(" ")[0])) {
      timeblock.addClass("present");
      inputEl.addClass("present");
    } else {
      timeblock.addClass("future");
      inputEl.addClass("future");
    }

    // Add row to the table
    table.append(timeblock);

    save.on('click', function() {
        let text = $(this).parent().children().children('input').val();
        console.log(text);
        dayTasks.push({time: time.text().split(" ")[0], task: text});
        console.log(dayTasks);
    })

    timeblock.on("click", function () {
    });
}



}

createTable();





