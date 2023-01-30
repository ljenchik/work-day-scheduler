// Display date in header
let currentDayEl = $("#currentDay");
currentDayEl.text(moment().format("LLLL").split(" ").slice(0, 4).join(" "));
let currentHour = moment().hour();

let table = $("#projectTable");
let timeblock;

let dayTasks = {}
// Add date to clear tasks for the previous day
dayTasks.date = moment().format("DD/MM/YYYY");

function createTable() {
  for (let i = 9; i < 24; i++) {
    
    // Table row
    timeblock = $("<tr>").addClass("time-block");


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
    let inputEl = $("<input>").addClass("textarea");
    task.append(inputEl);

    // Add icon for saving the task
    save.append('<i class="fa-solid fa-floppy-disk"></i>').css('background', '#17a2b8cf');

    timeblock.append(time).addClass("hour");
    timeblock.append(task);
    timeblock.append(save);

    timeblock.attr("data-index", i);
    //console.log(timeblock.attr('data-index'));

    if (currentHour > parseInt(time.text().split(" ")[0])) {
      task.addClass("past");
      inputEl.addClass("past");
    } else if (currentHour === parseInt(time.text().split(" ")[0])) {
      task.addClass("present");
      inputEl.addClass("present");
    } else {
      task.addClass("future");
      inputEl.addClass("future");
    }

    // Add row to the table
    table.append(timeblock);

    // Save task to array of objects
    save.on("click", function () {
      let text = $(this).parent().children().children("input").val();
      let hour = time.text().split(" ")[0];
      // Add to array if task is not empty
      if (text) {
        dayTasks[hour] = text;
      }
      // Delete if empty input
      else {
        delete dayTasks[hour];
      }
      //console.log(dayTasks);
      localStorage.setItem("tasks", JSON.stringify(dayTasks));
    });
  }
}



function getTasks() {
  if (JSON.parse(localStorage.getItem("tasks"))) {
    dayTasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log("dayTasks", dayTasks);

  for (const [key, value] of Object.entries(dayTasks)) {
    $('#projectTable > tbody > tr').each(function() { 
      if (`${key}` ===  $(this).attr('data-index')) {
        $(this).children().children('input').val(`${value}`);
      };
});
    
  }

  // Clear local storage from the previous day tasks
  if (moment().format("DD/MM/YYYY") !== dayTasks.date) {
    localStorage.clear();
  }

}


createTable();
getTasks();



// var inp = $("input");
// inp.focus(function() { $(this).css("background-color", "blue"); });
// inp.blur(function() { $(this).css("background-color", "red"); });