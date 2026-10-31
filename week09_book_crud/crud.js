
const API_URL = "https://6adea6e84e88f1bba4a53aec.mockapi.io/book";

const loadBtn = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const bookList = document.querySelector("#bookList");

async function loadBooks() {
    loadBtn.disabled = true;
    status.textContent = "도서 데이터를 가져오는 중 ...";
    bookList.replaceChildren();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const books = await response.json();

        books.forEach(book => {
            const li = document.createElement("li");
            li.textContent = `${book.title}/${book.author}/${book.genre}/${book.price}원/${book.year}년`;
            bookList.appendChild(li);
        });

        status.textContent = `${books.length}개의 도서를 가져왔습니다.`;

    } catch (error) {
        status.textContent = `조회 실패: ${error.message}`;

    } finally {
        loadBtn.disabled = false;
    }
}

// 버튼 클릭 시 도서 목록 조회
loadBtn.addEventListener("click", loadBooks);


const bookForm = document.querySelector("#bookForm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const genreInput = document.querySelector("#genre");
const priceInput = document.querySelector("#price");
const yearInput = document.querySelector("#year");

async function addBook(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();
    const price = Number(priceInput.value);
    const year = Number(yearInput.value);

    if (!title || !author || !genre || !priceInput.value || !yearInput.value) {
        status.textContent = "모든 항목을 입력해 주세요.";
        return;
    }

    if (price < 0 || year <= 0) {
        status.textContent = "가격과 출판 연도를 올바르게 입력해 주세요.";
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
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

        bookForm.reset();
        await loadBooks();
        status.textContent = "도서가 성공적으로 등록되었습니다.";
    } catch (error) {
        status.textContent = `등록 실패: ${error.message}`;
    }
}

bookForm.addEventListener("submit", addBook);


