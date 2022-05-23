import Final from './final.js';
import Question from './question.js'

class Quiz {
  constructor(quizElement, amount, questions) {
    this.quizElement = quizElement;
    this.currentElement = document.getElementById('current');
    this.totalElement = document.getElementById('total');
    this.nextButton = document.getElementById('next');
    this.finalElement = document.getElementById('final')

    this.totalAmount = amount;
    this.answeredAmount = 0;
    this.questions = this.setQuestions(questions);
    
    this.nextButton.addEventListener('click', this.nextQuestion.bind(this));
    this.renderQuestion();
  }

  setQuestions(questions) {
    return questions.map(question => new Question(question));
  }

  renderQuestion() {
    this.questions[this.answeredAmount].render();
    this.currentElement.innerHTML = this.answeredAmount;
    this.totalElement.innerHTML = this.totalAmount;
  }

  nextQuestion() {
    const checkedElement = this.questions[this.answeredAmount].answerElements.filter(el => el.firstChild.checked);
    if (checkedElement.length === 0) {
      
    } else {
      this.questions[this.answeredAmount].answer(checkedElement)
      this.answeredAmount++;
      (this.answeredAmount < this.totalAmount) ? this.renderQuestion() : this.endQuiz();
    }
  }

  endQuiz() {
    this.quizElement.style.display = 'none';
    this.finalElement.style.display = 'block';
    const correctAnswersTotal = this.calculateCorrectAnswers();
    this.final = new Final(correctAnswersTotal, this.totalAmount);
  }

  calculateCorrectAnswers() {
    let count = 0;
    this.questions.forEach(el => {
      if (el.isCorrect) {
        count++;
      }
    });
    return count;
  }
}

export default Quiz;