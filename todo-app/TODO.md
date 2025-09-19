# Todo App Conversion to Client-Side

## Overview
Convert the Node.js backend todo-app to a pure client-side application using localStorage for data persistence.

## Steps
- [ ] Rewrite script.js to use localStorage instead of fetch API calls
- [ ] Remove server.js (Express server)
- [ ] Remove package.json (Node dependencies)
- [ ] Test the app by opening index.html in browser
- [ ] Verify data persistence across browser sessions

## Details
- Store users and tasks as JSON strings in localStorage
- Generate unique IDs for new users and tasks
- Ensure all CRUD operations work with localStorage
- Remove async/await and fetch calls
- Keep index.html and styles.css unchanged
