
// ... existing code above ... (questions, timer, greeting, etc.)

// DOM Ready: Attach Start Button Event
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startQuiz();
    });
  }
});

// Start Quiz Logic
function startQuiz() {
  document.getElementById("greeting").style.display = "none";
  document.querySelector(".controls").style.display = "none";
  document.querySelector(".leaderboard-section").style.display = "none";
  startTimer();

  const subjectSelect = document.getElementById("subject");
  const quizContainer = document.getElementById("quiz");
  const questionText = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const submitBtn = document.getElementById("submitBtn");

  let currentSubject = subjectSelect.value;
  let quizQuestions = questions[currentSubject];
  let currentIndex = 0;
  let score = 0;

  function showQuestion(index) {
    const currentQ = quizQuestions[index];
    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = "";
    currentQ.options.forEach((opt, i) => {
      const option = document.createElement("button");
      option.textContent = opt;
      option.classList.add("option-btn");
      option.onclick = () => {
        document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
        option.classList.add("selected");
      };
      optionsContainer.appendChild(option);
    });
  }

  submitBtn.onclick = () => {
    const selected = document.querySelector(".option-btn.selected");
    if (!selected) return alert("Please select an answer.");
    if (selected.textContent === quizQuestions[currentIndex].answer) {
      score++;
    }
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      showQuestion(currentIndex);
    } else {
      clearInterval(timerInterval);
      endQuiz(score);
    }
  };

  quizContainer.style.display = "block";
  showQuestion(currentIndex);
}

function endQuiz(score) {
  document.getElementById("greeting").style.display = "block";
  document.querySelector(".controls").style.display = "block";
  document.querySelector(".leaderboard-section").style.display = "block";
  document.getElementById("quiz").style.display = "none";

  const name = prompt("Enter your name for the leaderboard:");
  saveScore(name || "Anonymous", score);
  alert("Quiz finished! You scored " + score + "/20");
  displayLeaderboard();
}
