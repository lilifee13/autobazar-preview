
const priceInput = document.getElementById('priceInput');
const feeDisplay = document.getElementById('feeDisplay');

if (priceInput) {
  priceInput.addEventListener('input', () => {
    const price = parseFloat(priceInput.value);
    if (!isNaN(price)) {
      const fee = Math.min(price * 0.05, 120);
      feeDisplay.textContent = `Fee: €${fee.toFixed(2)}`;
    } else {
      feeDisplay.textContent = 'Fee: —';
    }
  });
}

function toggleMode() {
  document.body.classList.toggle('dark');
}

function generateDescription() {
  const box = document.getElementById('descriptionBox');
  box.value = "High-quality used car part, well-maintained and perfect for your next build.";
}
