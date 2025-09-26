function updateClock() {
  const clock = document.getElementById("digital-clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    radius: 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

const API_URL = "https://animation-api.onrender.com";
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

function loadNotes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      notesList.innerHTML = "";
      data.forEach(note => renderNote(note));
    });
}
loadNotes();

function renderNote(note) {
  const li = document.createElement("li");
  li.textContent = note.text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit note:", note.text);
    if (newText) {
      fetch(`${API_URL}/${note.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
      }).then(loadNotes);
    }
  };

  li.appendChild(editBtn);
  notesList.appendChild(li);
}

noteForm.addEventListener("submit", e => {
  e.preventDefault();
  const newNote = { text: noteInput.value };
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote)
  })
    .then(() => {
      noteInput.value = "";
      loadNotes();
    });
});