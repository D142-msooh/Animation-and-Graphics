const steps = [
  { img: "images/step1.jpg", caption: "Step 1: Heat from magma beneath the Earth's surface heats underground water." },
  { img: "images/step2.jpg", caption: "Step 2: The hot water turns into steam and rises through wells." },
  { img: "images/step3.jpg", caption: "Step 3: The steam spins a turbine connected to a generator." },
  { img: "images/step4.jpg", caption: "Step 4: The generator produces electricity which is sent to power lines." }
];

function showStep(stepNumber) {
  const step = steps[stepNumber - 1];
  document.getElementById("stepImage").src = step.img;
  document.getElementById("caption").innerText = step.caption;
}


const API_URL = "https://animation-api.onrender.com";

const factList = document.getElementById("fact-list");
const factForm = document.getElementById("fact-form");
const updateForm = document.getElementById("update-form");

function loadFacts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      factList.innerHTML = "";
      data.forEach(fact => {
        const p = document.createElement("p");
        p.textContent = `${fact.id}: ${fact.text}`;
        factList.appendChild(p);
      });
    });
}

factForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = document.getElementById("fact-text").value;
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(() => {
    factForm.reset();
    loadFacts();
  });
});

updateForm.addEventListener("submit", e => {
  e.preventDefault();
  const id = document.getElementById("update-id").value;
  const text = document.getElementById("update-text").value;
  fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(() => {
    updateForm.reset();
    loadFacts();
  });
});

loadFacts();