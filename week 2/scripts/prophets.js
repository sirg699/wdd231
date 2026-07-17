const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {

    // Create elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');

    // Build the heading
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute(
      'alt',
      `Portrait of ${prophet.name} ${prophet.lastname}`
    );
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Add elements to the card
    card.appendChild(fullName);
    card.appendChild(portrait);

    // Add card to the page
    cards.appendChild(card);

  });
};