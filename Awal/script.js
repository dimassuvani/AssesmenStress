const stressForm = document.getElementById("stressForm");
const submitButton = document.getElementById("submitButton");

// Hide the submit button initially
submitButton.style.display = "none";

stressForm.addEventListener("change", function() {
  const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');

  // Check if all questions are answered
  if (selectedAnswers.length === 10) {
    submitButton.style.display = "block";
  } else {
    submitButton.style.display = "none";
  }
});

stressForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page refresh after form submission

  // Check if the notification has been shown before
  var notificationShown = sessionStorage.getItem("notificationShown");

  if (!notificationShown) {
    // Get the values of the selected answers
    var answers = [];
    for (var i = 1; i <= 10; i++) {
      var question = "q" + i;
      var selectedAnswer = document.querySelector('input[name="' + question + '"]:checked');
      if (selectedAnswer) {
        answers.push(selectedAnswer.value);
      } else {
        // If any question is unanswered, display an error message and return
        alert("Please answer all questions before calculating the score.");
        return;
      }
    }

    // Rest of the code for calculating and displaying the score
    // ...

    // Set the notification status to true
    sessionStorage.setItem("notificationShown", true);
  }

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
      score += 9; // Add 10 to the score if the answer is "ya"
    } else if (answers[j] === "sering") {
      score += 5; // Add 5 to the score if the answer is "sering"
    } else if (answers[j] === "jarang") {
      score += 2; // Add 2 to the score if the answer is "jarang"
    } else if (answers[j] === "tidak") {
      score += 1; // Add 1 to the score if the answer is "tidak"
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
  questionCell.textContent = "Nilai Kamu:";
  scoreTableRow.appendChild(questionCell);

  var scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  scoreTableRow.appendChild(scoreCell);

  var descriptionCell = document.createElement("td");
  var description = "";
  if (score < 50) {
    description = "Masih Sehat";
  } else if (score >= 51 && score < 70) {
    description = "Kurang Sehat";
  } else if (score >= 71 && score < 90) {
    description = "Cukup Stress";
  } else if (score >= 91 && score < 100) {
    description = "Aku Tahu Pasti Kamu Kurang Duit";
  }
  descriptionCell.textContent = description;
  scoreTableRow.appendChild(descriptionCell);
});

document.getElementById("refreshButton").addEventListener("click", function() {
  location.reload();
});