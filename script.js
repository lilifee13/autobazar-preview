
const priceInput = document.getElementById('priceInput');
const feeDisplay = document.getElementById('feeDisplay');

priceInput.addEventListener('input', () => {
  const price = parseFloat(priceInput.value);
  if (!isNaN(price)) {
    const fee = Math.min(price * 0.05, 120);
    feeDisplay.textContent = `Fee: €${fee.toFixed(2)}`;
  } else {
    feeDisplay.textContent = 'Fee: —';
  }
});

function toggleMode() {
  document.body.classList.toggle('dark');
}
