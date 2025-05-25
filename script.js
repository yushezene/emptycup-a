document.addEventListener("DOMContentLoaded", function () {
  const shortlistFilter = document.getElementById("shortlist-filter");
  let isFilterOn = false;

  // Fetch and render listings
  fetch("listings.json")
    .then(response => response.json())
    .then(data => {
      const listContainer = document.querySelector(".studio-list");
      listContainer.innerHTML = ""; 

      data.forEach((studio, index) => {
        const colorClass = index % 2 === 0 ? "yellow" : "white";
        const phoneList = studio.phones.map(p => `<p>${p}</p>`).join("");

        const card = document.createElement("div");
        card.className = `studio-card ${colorClass}`;
        card.innerHTML = `
          <div class="card-content">
            <h2>${studio.name}</h2>
            <div class="stars"><img src="${studio.stars}" alt="Star"/></div>
            <p>${studio.description}</p>
            <div class="stats">
              <div><strong>${studio.projects}</strong><br/>Projects</div>
              <div><strong>${studio.years}</strong><br/>Years</div>
              <div class="mon"><img src="${studio.priceIcon}" alt="mon" /></div>
            </div>
            <div class="phones">${phoneList}</div>
          </div>
          <div class="divider"></div>
          <div class="card-actions">
            <div class="action"><img src="img/Details.png" alt="Details" /></div>
            <div class="action"><img src="img/Hide.png" alt="Hide" /></div>
            <div class="action shortlist-btn"><img src="img/Shortlist2.png" alt="Shortlist" /></div>
            <div class="action"><img src="img/Report.png" alt="Report" /></div>
          </div>
        `;
        listContainer.appendChild(card);
      });

      // 
      const shortlistButtons = document.querySelectorAll(".shortlist-btn");

      shortlistButtons.forEach(button => {
        const img = button.querySelector("img");
        const card = button.closest(".studio-card");

        // initial 
        const isShortlisted = img.src.includes("img/Shortlist.png"); 
        if (isShortlisted) {
          card.classList.add("shortlisted");
        } else {
          card.classList.remove("shortlisted");
        }

        button.addEventListener("click", function () {
          card.classList.toggle("shortlisted");

          // Update icon
          if (card.classList.contains("shortlisted")) {
            img.src = "img/Shortlist.png"; // filled icon
          } else {
            img.src = "img/Shortlist2.png"; // outline icon
          }

          if (isFilterOn) {
            filterShortlisted();
          }
        });
      });
    });

  // toggle
  shortlistFilter.addEventListener("click", function () {
    isFilterOn = !isFilterOn;
    shortlistFilter.classList.toggle("active");
    filterShortlisted();
  });

  // 
  function filterShortlisted() {
    const allCards = document.querySelectorAll(".studio-card");

    allCards.forEach(card => {
      card.style.display =
        isFilterOn && !card.classList.contains("shortlisted") ? "none" : "flex";
    });
  }
});
