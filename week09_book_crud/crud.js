
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
