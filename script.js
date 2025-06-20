const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const subjectSelect = document.getElementById('subject');
const questionBox = document.getElementById('question-box');
const optionsBox = document.getElementById('options');
const quizContainer = document.getElementById('quiz-container');
const resultBox = document.getElementById('result');
const finalScore = document.getElementById('final-score');
const leaderboard = document.getElementById('leaderboard');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const greeting = document.getElementById('greeting');
const menu = document.getElementById('menu');

let questionIndex = 0;
let score = 0;
let currentQuestions = [];
let timer;
let timeLeft = 300; // 5 mins for all 20 questions

startButton.addEventListener('click', () => {
  const selectedSubject = subjectSelect.value;
  currentQuestions = questions[selectedSubject];
  questionIndex = 0;
  score = 0;
  timeLeft = 300;
  greeting.style.display = 'none';
  menu.style.display = 'none';
  quizContainer.classList.remove('hidden');
  startTimer();
  showQuestion();
});

nextButton.addEventListener('click', () => {
  questionIndex++;
  if (questionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function showQuestion() {
  const q = currentQuestions[questionIndex];
  questionBox.textContent = `${questionIndex + 1}. ${q.question}`;
  optionsBox.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(selected) {
  if (selected === currentQuestions[questionIndex].answer) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
  nextButton.style.display = 'inline-block';
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add('hidden');
  resultBox.classList.remove('hidden');
  finalScore.textContent = `Your final score: ${score} / ${currentQuestions.length}`;
  updateLeaderboard(score);
}

function updateLeaderboard(score) {
  let scores = JSON.parse(localStorage.getItem('thinkchamp-scores')) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);
  localStorage.setItem('thinkchamp-scores', JSON.stringify(scores));
  leaderboard.innerHTML = '';
  scores.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${s}`;
    leaderboard.appendChild(li);
  });
}

function startTimer() {
  timerDisplay.textContent = formatTime(timeLeft);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Greeting
const hour = new Date().getHours();
const greetText = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
greeting.textContent = `${greetText}, welcome to ThinkChamp!`;
