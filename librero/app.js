function switchPage(page) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('search').style.display = 'none';
  document.getElementById('mybooks').style.display = 'none';
  document.getElementById(page).style.display = 'block';

  if (page === 'home') loadHomeBooks();
  if (page === 'mybooks') renderMyBooks();
}

function loadHomeBooks() {
  fetch(`https://openlibrary.org/search.json?q=book&limit=9`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('homeBooks');
      container.innerHTML = '';
      data.docs.forEach(book => {
        container.innerHTML += renderBookCard(book, false);
      });
    });
}

function searchBooks() {
  const query = document.getElementById('searchInput').value;
  fetch(`https://openlibrary.org/search.json?q=${query}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('searchResults');
      container.innerHTML = '';
      data.docs.forEach(book => {
        container.innerHTML += renderBookCard(book, true);
      });
    });
}

function renderBookCard(book, allowAdd) {
  const title = book.title || 'Unknown';
  const author = book.author_name ? book.author_name[0] : 'Unknown';
  const key = book.key;
  const synopsis = book.first_sentence ? book.first_sentence[0] : 'No synopsis available';
  const coverId = book.cover_i;
  const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : '';

  let card = `<div class='book'>`;
  if (coverUrl) {
    card += `<img src='${coverUrl}' alt='Cover of ${title}' />`;
  }
  card += `
    <strong>${title}</strong>
    <em>by ${author}</em>
    <p>${synopsis}</p>
    <div class="progress">Progress: Not Started</div>`;
  if (allowAdd) {
    card += `<button onclick='addToMyBooks("${key}", "${title}", "${author}", \`${synopsis}\`, "${coverUrl}")'>Add to My Books</button>`;
  }
  card += `</div>`;
  return card;
}

function addToMyBooks(key, title, author, synopsis, coverUrl) {
  const myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  if (!myBooks.find(book => book.key === key)) {
    myBooks.push({ key, title, author, synopsis, coverUrl, progress: 'Not Started' });
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    alert('Book added!');
  }
}

function renderMyBooks() {
  const container = document.getElementById('myBooksList');
  const myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  container.innerHTML = '';
  myBooks.forEach((book, index) => {
    container.innerHTML += `
      <div class='book'>
        ${book.coverUrl ? `<img src='${book.coverUrl}' alt='Cover of ${book.title}' />` : ''}
        <strong>${book.title}</strong>
        <em>by ${book.author}</em>
        <p>${book.synopsis}</p>
        <div class="progress">Progress: ${book.progress}</div>
        <button onclick="updateProgress(${index})">Update Progress</button>
        <button class="remove" onclick="removeBook(${index})">Remove</button>
      </div>`;
  });
}

function updateProgress(index) {
  const options = ['Not Started', 'In Progress', 'Completed'];
  const myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  let current = options.indexOf(myBooks[index].progress);
  current = (current + 1) % options.length;
  myBooks[index].progress = options[current];
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
  renderMyBooks();
}

function removeBook(index) {
  const myBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
  myBooks.splice(index, 1);
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
  renderMyBooks();
}

loadHomeBooks();