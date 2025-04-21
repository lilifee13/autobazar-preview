const listings = [
  {
    title: "BMW M3 Headlights",
    condition: "Used - Like New",
    location: "Zurich, Switzerland",
    posted: "2 hours ago",
    image: "https://via.placeholder.com/150"
  },
  {
    title: "Toyota Corolla Engine Mount",
    condition: "Brand New",
    location: "Bern, Switzerland",
    posted: "Yesterday",
    image: "https://via.placeholder.com/150"
  },
  {
    title: "VW Golf GTI Exhaust",
    condition: "Used - Good",
    location: "Geneva, Switzerland",
    posted: "3 days ago",
    image: "https://via.placeholder.com/150"
  }
];

const listingsContainer = document.getElementById('listings');

if (listingsContainer) {
  listings.forEach(part => {
    const card = document.createElement('div');
    card.style = `
      background: white;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    `;

    card.innerHTML = `
      <img src="${part.image}" alt="${part.title}" style="width:100%; max-width:200px; border-radius: 6px;">
      <h3>${part.title}</h3>
      <p><strong>Condition:</strong> ${part.condition}</p>
      <p><strong>Location:</strong> ${part.location}</p>
      <p><strong>Posted:</strong> ${part.posted}</p>
    `;

    listingsContainer.appendChild(card);
  });
}
