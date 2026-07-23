// Port Harcourt Chamber of Commerce - spotlights.js

const membershipLabels = {
  2: "Silver Member",
  3: "Gold Member",
};

async function getMemberData() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  return data.members;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function spotlightTemplate(member) {
  return `
    <div class="spotlight-card">
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="80" height="80">
      <span class="membership-badge badge-${member.membership}">
        ${membershipLabels[member.membership]}
      </span>
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit website</a></p>
    </div>
  `;
}

async function loadSpotlights() {
  const members = await getMemberData();
  const eligible = members.filter(
    (member) => member.membership === 2 || member.membership === 3
  );
  const shuffled = shuffle(eligible);

  // Show 2 or 3 spotlights, randomly, but never more than what's available.
  const count = Math.min(shuffled.length, Math.random() < 0.5 ? 2 : 3);
  const selected = shuffled.slice(0, count);

  document.querySelector("#spotlights").innerHTML = selected
    .map(spotlightTemplate)
    .join("");
}

loadSpotlights();
