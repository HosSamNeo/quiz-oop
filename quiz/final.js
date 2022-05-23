class Final {
  constructor(count, totalAmount) {
    this.scoreElement = document.getElementById('score');
    this.againButton = document.getElementById('again');

    this.render(count, totalAmount);
    this.againButton.addEventListener('click', location.reload.bind(location));
  }

  render(count, totalAmount) {
    this.scoreElement.innerHTML = `You answered ${count} out of ${totalAmount} correct!`;
  }
}

export default Final;