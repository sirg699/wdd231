// Port Harcourt Chamber of Commerce - directory.js

// ---------- Mobile navigation toggle ----------
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const isOpen = navMenu.classList.contains("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---------- Footer: last modified date ----------
document.querySelector("#lastModified").textContent = document.lastModified;

// ---------- Member directory: fetch + render ----------
const membershipLabels = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

async function getMemberData() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  return data.members;
}

function cardTemplate(member) {
  return `
    <div class="member-card">
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="72" height="72">
      <div class="member-info">
        <span class="membership-badge badge-${member.membership}">
          ${membershipLabels[member.membership]}
        </span>
        <h3>${member.name}</h3>
        <p>${member.industry}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit website</a></p>
      </div>
    </div>
  `;
}

function renderMembers(members) {
  const container = document.querySelector("#member-display");
  container.innerHTML = members.map(cardTemplate).join("");
}

async function displayMembers() {
  const members = await getMemberData();
  renderMembers(members);
  document.querySelector("#member-count").textContent =
    `${members.length} member businesses`;
}

displayMembers();

// ---------- Grid / List view toggle ----------
const gridButton = document.querySelector("#grid-view-btn");
const listButton = document.querySelector("#list-view-btn");
const display = document.querySelector("#member-display");

gridButton.addEventListener("click", () => {
  display.classList.add("grid-view");
  display.classList.remove("list-view");
  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
  display.classList.add("list-view");
  display.classList.remove("grid-view");
  listButton.classList.add("active");
  gridButton.classList.remove("active");
});
