# Animation-and-Graphics# remote-for-Animation-and-graphics
# remote-for-Animation-and-graphics
This is a simple interactive website project that demonstrates basic **HTML**, **CSS**, and **JavaScript** concepts.  
The project was built with beginner-friendly code to practice web development skills.

## Features

1. **Particle Galaxy Animation**
   - A moving particle effect displayed on a canvas.
   - Uses JavaScript and animation functions.

2. **Digital Clock**
   - Shows the current time.
   - Updates every second using `setInterval`.

3. **Graphics Section**
   - Contains several animated images.
   - Images are hidden by default and displayed (only when the button is clicked**).

4. **Notes App**
   - Lets you add, edit, and view notes.
   - Uses a local `db.json` with **JSON Server** to store notes.
   - Demonstrates `fetch()`, `POST`, and `PATCH` requests.

## How to Run the Project

1. **Clone** this project to your folder/repository.  

2. Open the project folder in your editor (VS Code) by use of **code .**

3. Open `index.html` in your browser to view the website.

4. For the **Notes app** to work:
   - Install **JSON Server** locally:
     npm install -g json-server
   - Create a `db.json` file in the project folder with the following content:
     {
       "notes": []
     }
   - Start the server:
     json-server --watch db.json --port 3000

   - The app will now fetch and save notes at `http://localhost:3000/notes`.
