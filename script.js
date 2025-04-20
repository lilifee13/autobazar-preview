
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmk8EWDN373aZXJ7DDYKJnH3ldATME2PU",
  authDomain: "bazar-238a0.firebaseapp.com",
  databaseURL: "https://bazar-238a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bazar-238a0",
  storageBucket: "bazar-238a0.firebasestorage.app",
  messagingSenderId: "214245165310",
  appId: "1:214245165310:web:edf98e66d935fad1393daf",
  measurementId: "G-3ZHW7C2Z47"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const listingsRef = ref(db, "listings");

const form = document.getElementById("listingForm");
const thankYou = document.getElementById("thankYouMsg");
const container = document.getElementById("listingContainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let imageUrl = document.getElementById("image").value.trim();
  if (!imageUrl) {
    imageUrl = "https://source.unsplash.com/300x200/?car,engine,garage";
  }

  const data = {
    title: document.getElementById("title").value,
    image: imageUrl,
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
    let displayImage = item.image;
    if (displayImage.includes("via.placeholder.com")) {
      displayImage = "https://source.unsplash.com/300x200/?car,parts";
    }

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${displayImage}" alt="${item.title}" onerror="this.src='https://source.unsplash.com/300x200/?broken,image';" />
      <h3>${item.title}</h3>
      <p>€${item.price} - ${item.condition}</p>
      <p>${item.location} — <small>${item.time}</small></p>
    `;
    container.prepend(card);
  });
});

document.getElementById("toggleButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

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
