const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Venus", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false }
      ]
    },
    {
      question: "Who wrote 'Hamlet'?",
      answers: [
        { text: "Leo Tolstoy", correct: false },
        { text: "William Shakespeare", correct: true },
        { text: "Charles Dickens", correct: false },
        { text: "Mark Twain", correct: false }
      ]
    }
  ];
  
  const questionEl = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer.text;
      btn.classList.add("btn");
      if (answer.correct) {
        btn.dataset.correct = true;
      }
      btn.addEventListener("click", selectAnswer);
      answerButtons.appendChild(btn);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtons.children).forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
      }
    });
  
    nextButton.style.display = "inline-block";
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    resetState();
    questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "inline-block";
    nextButton.onclick = startQuiz;
  }
  
  startQuiz();
  