let currentDayEl = $("#currentDay");
currentDayEl.text(moment().format("LLLL").split(" ").slice(0, 4).join(" "));


let currentHour = moment().hour();
// Append empty rows to the table
let table = $('#projectTable');



for (let i = 9; i < 24; i++) {
  let row = $("<tr>");
  let time = $("<td>");
  let task =  $("<td>");
  let isCompleted =  $("<td>");

  if (i < 12) {
    time.append(
      $("<p>")
        .text(i + " am")
        .css('width', '10%')
    );
  } else {
    time.append(
      $("<p>")
        .text(i + " pm")
        .css('width', '10%')
    );
  }
  
  task.append($("<p>")).css('width', '80%');
  isCompleted.append('<i class="fa-solid fa-calendar-check fa-2xl"></i>');

  row.append(time);
  row.append(task);
  row.append(isCompleted);
  if (currentHour > parseInt(time.text().split(' ')[0])) {
    row.addClass('past');
  }
    else if (currentHour === parseInt(time.text().split(' ')[0])) {
        row.addClass('present');
    }
    else {
        row.addClass('future');
    }
  table.append(row);
}


