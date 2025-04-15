const container = document.getElementById("cardsContainer");
const filter = document.getElementById("characterFilter");

let allCharacters = [];

const renderCards = (characters) => {
  container.innerHTML = "";
  characters.forEach((character) => {
    container.innerHTML += `
      <div class="card">
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Estado: ${character.status}</p>
        <p>Especie: ${character.species}</p>
      </div>
    `;
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posición X del cursor dentro de la tarjeta
      const y = e.clientY - rect.top; // Posición Y del cursor dentro de la tarjeta

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10; // Rotación en el eje X
      const rotateY = ((x - centerX) / centerX) * -10; // Rotación en el eje Y

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)"; // Restablece la rotación
    });
  });
};

const fillFilter = (characters) => {
  characters.forEach((character) => {
    const option = document.createElement("option");
    option.value = character.name;
    option.textContent = character.name;
    filter.appendChild(option);
  });
};

const fetchCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  allCharacters = data.results.slice(0, 20); // Tomamos los primeros 20 personajes
  renderCards(allCharacters);
  fillFilter(allCharacters);
};

filter.addEventListener("change", (e) => {
  const selected = e.target.value;
  if (selected === "all") {
    renderCards(allCharacters);
  } else {
    const filtered = allCharacters.filter((c) => c.name === selected);
    renderCards(filtered);
  }
});

fetchCharacters();
