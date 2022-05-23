import Quiz from './quiz.js';

class quizInfo {
  constructor() {
    this.quizElement = document.getElementById('quiz');
    this.settingsElement = document.getElementById('settings');
    this.category = document.getElementById('category');
    this.numberOfQuestions = document.getElementById('questions');
    this.difficulty = [
      document.getElementById('easy'),
      document.getElementById('medium'),
      document.getElementById('hard')
    ];
    this.startButton = document.getElementById('start');

    this.quiz = { };

    this.startButton.addEventListener('click', this.startQuiz.bind(this));
  }

  async startQuiz() {
    try {
      const amount = this.getAmount();
      const categoryId = this.category.value;
      const difficulty = this.getCurrentDifficulty();
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
      let data = await this.fetchData(url);
      this.toggleVisibility();
      this.quiz = new Quiz(this.quizElement, amount, data.results);
    } catch (error) {
      alert(error);
    }
  }

  toggleVisibility() {
    this.settingsElement.style.display = 'none';
    this.quizElement.style.display = 'block';
  }

  async fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  }

  getCurrentDifficulty() {
    const checkedDifficulty = this.difficulty.filter(element => element.checked);

    if (checkedDifficulty.length === 1) {
      return checkedDifficulty[0].id;
    } else {
      throw new Error('Please select a difficulty!');
    }
  }

  getAmount() {
    const amount = this.numberOfQuestions.value;
    if (amount > 0 && amount <= 10) {
      return amount;
    }
    throw new Error('Please enter a number of questions between 1 and 10!');
  }
}

export default quizInfo;