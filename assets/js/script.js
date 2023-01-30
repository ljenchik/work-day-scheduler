let dayTasks;

// Display date in header
let currentDayEl = $("#currentDay");
currentDayEl.text(moment().format("LLLL").split(" ").slice(0, 4).join(" "));
let currentHour = moment().hour();
let table = $("#projectTable");

function createTable() {
  for (let i = 9; i < 24; i++) {
    // Table row
    let timeblock = $("<tr>").addClass("time-block");

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

    timeblock.append(time).attr("data-index", i);
    timeblock.append(task).attr("data-index", i);
    timeblock.append(save).attr("data-index", i);

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

    // Save task to array of objects
    save.on("click", function () {
      let text = $(this).parent().children().children("input").val().trim();
      let hour = time.text().split(" ")[0];
      // Add to array if task is not empty
      if (text) {
        dayTasks[hour] = text;
      }
      // Delete if empty input
      else {
        delete dayTasks[hour];
      }
      console.log(dayTasks);
      localStorage.setItem("tasks", JSON.stringify(dayTasks));
    });
  }
}

function getTasks() {
  createTable();

  if (JSON.parse(localStorage.getItem("tasks").length > 0)) {
    dayTasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    dayTasks = {};
  }
  console.log("dayTasks", dayTasks);

  for (const [key, value] of Object.entries(dayTasks)) {
    console.log(`${key}`);
    console.log(`${value}`);

    if (table.find(`[data-index=${key}]`)[1]) {
      table.find(`[data-index=${key}]`)[1].replaceWith(`${value}`)
        console.log(table.children().children().children('input').val(`${value}`));
    }
  }
}

getTasks();
