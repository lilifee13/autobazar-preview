
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const listingsRef = ref(db, "listings");

const form = document.getElementById("listingForm");
const thankYou = document.getElementById("thankYouMsg");
const container = document.getElementById("listingContainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    condition: document.getElementById("condition").value,
    location: document.getElementById("location").value,
    price: document.getElementById("price").value,
    time: new Date().toLocaleString()
  };
  push(listingsRef, data).then(() => {
    thankYou.style.display = "block";
    form.reset();
    document.getElementById("feeDisplay").textContent = "Fee: —";
  });
});

onValue(listingsRef, (snapshot) => {
  container.innerHTML = "";
  snapshot.forEach((child) => {
    const item = child.val();
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>€${item.price} - ${item.condition}</p>
      <p>${item.location} — <small>${item.time}</small></p>
    `;
    container.prepend(card);
  });
});

function toggleMode() {
  document.body.classList.toggle("dark");
}

const priceInput = document.getElementById('price');
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
