document.getElementById("refreshButton").addEventListener("click", function() {
  location.reload();
});
document.getElementById("stressForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page refresh after form submission

  // Get the values of the selected answers
  var answers = [];
  for (var i = 1; i <= 10; i++) {
    var question = "q" + i;
    var selectedAnswer = document.querySelector('input[name="' + question + '"]:checked');
    if (selectedAnswer) {
      answers.push(selectedAnswer.value);
    }
  }

  // Calculate the score based on the answers
  var score = 0;
  for (var j = 0; j < answers.length; j++) {
    if (answers[j] === "ya") {
      score += 10; // Add 10 to the score if the answer is "ya"
    } else if (answers[j] === "sering") {
      score += 5; // Add 5 to the score if the answer is "sering"
    } else if (answers[j] === "jarang") {
      score += 2; // Add 2 to the score if the answer is "jarang"
    }
  }

  // If the score is greater than or equal to 75, set the score to 100
  if (score >= 75) {
    score = 100;
  }

  // Display the score on the page
  var scoreTable = document.getElementById("scoreTable");
  if (!scoreTable) {
    scoreTable = document.createElement("table");
    scoreTable.id = "scoreTable";
    document.body.appendChild(scoreTable);

    var scoreTableRow = document.createElement("tr");
    scoreTable.appendChild(scoreTableRow);

    var questionHeader = document.createElement("th");
    questionHeader.textContent = "Question";
    scoreTableRow.appendChild(questionHeader);

    var scoreHeader = document.createElement("th");
    scoreHeader.textContent = "Score";
    scoreTableRow.appendChild(scoreHeader);
  }

  var scoreTableRow = document.createElement("tr");
  scoreTable.appendChild(scoreTableRow);

  var questionCell = document.createElement("td");
  questionCell.textContent = "Total Score:";
  scoreTableRow.appendChild(questionCell);

  var scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  scoreTableRow.appendChild(scoreCell);

  var descriptionCell = document.createElement("td");
  var description = "";
  if (score < 50) {
    description = "Sehat";
  } else if (score >= 50 && score < 80) {
    description = "Agak Stress";
  } else if (score >= 80 && score < 100) {
    description = "Stress";
  } else if (score === 100) {
    description = "Anda harus banyak istirahat";
  }
  descriptionCell.textContent = description;
  scoreTableRow.appendChild(descriptionCell);
});