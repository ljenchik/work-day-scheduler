let currentDayEl = $("#currentDay");
currentDayEl.text(moment().format("LLLL").split(" ").slice(0, 4).join(" "));

// Table
let table = $('#projectTable');

for (let i = 9; i < 18; i++) {
  let row = $("<tr>");
  let time = $("<td>");
  let task =  $("<td>");
  let isCompleted =  $("<td>");

  if (i < 12) {
    time.append(
      $("<p>")
        .text(i + "am")
        .css('width', '10%')
    );
  } else {
    time.append(
      $("<p>")
        .text(i + "pm")
        .css('width', '10%')
    );
  }
  
  task.append($("<p>")).css('width', '80%');
  isCompleted.append('<i class="fa-solid fa-calendar-check fa-2xl"></i>');

  row.append(time);
  row.append(task);
  row.append(isCompleted);
  table.append(row);
}
