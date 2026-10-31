const API_URL = "https://6adea6e84e88f1bba4a53aec.mockapi.io/book";

const loadBtn = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const bookList = document.querySelector("#bookList");

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const bookForm = document.querySelector("#bookForm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const genreInput = document.querySelector("#genre");
const priceInput = document.querySelector("#price");
const yearInput = document.querySelector("#year");
const submitBtn = bookForm.querySelector("button[type='submit']");

let editingBookId = null;
let allBooks = [];

function displayBooks(books) {
    bookList.replaceChildren();

    books.forEach(book => {
        const li = document.createElement("li");

        const info = document.createElement("span");
        info.textContent = `${book.title}/${book.author}/${book.genre}/${book.price}원/${book.year}년`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";

        editBtn.addEventListener("click", () => {
            editingBookId = book.id;

            titleInput.value = book.title;
            authorInput.value = book.author;
            genreInput.value = book.genre;
            priceInput.value = book.price;
            yearInput.value = book.year;

            submitBtn.textContent = "수정";
            status.textContent = "도서 정보를 수정해 주세요.";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";

        deleteBtn.addEventListener("click", async () => {
            const confirmed = confirm(`"${book.title}" 도서를 삭제할까요?`);

            if (!confirmed) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${book.id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                await loadBooks();
                status.textContent = "도서가 성공적으로 삭제되었습니다.";

            } catch (error) {
                status.textContent = `삭제 실패: ${error.message}`;
            }
        });

        li.appendChild(info);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        bookList.appendChild(li);
    });
}

async function loadBooks() {
    loadBtn.disabled = true;
    status.textContent = "도서 데이터를 가져오는 중 ...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        allBooks = await response.json();

        displayBooks(allBooks);

        status.textContent = `${allBooks.length}개의 도서를 가져왔습니다.`;

    } catch (error) {
        status.textContent = `조회 실패: ${error.message}`;

    } finally {
        loadBtn.disabled = false;
    }
}

loadBtn.addEventListener("click", loadBooks);

function searchBooks() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword)
    );

    displayBooks(filteredBooks);

    status.textContent = filteredBooks.length > 0
        ? `${filteredBooks.length}개의 검색 결과가 있습니다.`
        : "검색 결과가 없습니다.";
}

searchBtn.addEventListener("click", searchBooks);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchBooks();
    }
});

async function addBook(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();
    const price = Number(priceInput.value);
    const year = Number(yearInput.value);

    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(price)) {
        status.textContent = "가격은 0 이상의 정수로 입력해 주세요.";
        return;
    }

    if (!Number.isInteger(year) || year <= 0) {
        status.textContent = "출판 연도는 양의 정수로 입력해 주세요.";
        return;
    }

    if (price < 0 || year <= 0) {
        status.textContent = "가격과 출판 연도를 올바르게 입력해 주세요.";
        return;
    }

    const isEditing = editingBookId !== null;

    const method = isEditing ? "PUT" : "POST";

    const url = isEditing
        ? `${API_URL}/${editingBookId}`
        : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                genre: genre,
                price: price,
                year: year
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const message = isEditing
            ? "도서가 성공적으로 수정되었습니다."
            : "도서가 성공적으로 등록되었습니다.";

        editingBookId = null;
        bookForm.reset();
        submitBtn.textContent = "추가";

        await loadBooks();

        status.textContent = message;

    } catch (error) {
        status.textContent = `저장 실패: ${error.message}`;
    }
}

bookForm.addEventListener("submit", addBook);