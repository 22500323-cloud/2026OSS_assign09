# Week 09 - Fetch API Book CRUD

## 1. 프로젝트 소개

이번 과제에서는 기존 JavaScript Array를 사용하던 도서 관리 프로그램을 Fetch API와 MockAPI를 이용하는 방식으로 변경했습니다.

도서 정보를 서버에서 가져오고, 새로운 도서를 등록하거나 기존 정보를 수정하고 삭제할 수 있도록 구현했습니다.

## 2. 배포 정보

- GitHub Repository:https://github.com/2026-2-OSS/assign09-c01-22500323.git
- GitHub Repository(개인):https://github.com/22500323-cloud/2026OSS_assign09.git
- Vercel Deployment:https://2026ossassign09-seven.vercel.app/
- MockAPI Endpoint:https://6adea6e84e88f1bba4a53aec.mockapi.io/book

## 3. 서비스 설명

- 주제: 도서 관리 (Book Management)
- Field:
  - id: 도서 ID
  - title: 도서 제목
  - author: 저자
  - genre: 장르
  - price: 가격
  - year: 출판 연도

### 주요 기능

- GET: 서버에 저장된 도서 목록 불러오기
- POST: 새로운 도서 등록하기
- PUT: 기존 도서 정보 수정하기
- DELETE: 삭제 확인 후 도서 삭제하기
- Search: 도서 제목과 저자로 검색하기
- Validation: 가격과 출판 연도 입력값 확인하기

## 4. 배운 내용

1. Fetch API: fetch()를 사용하면 서버에 요청을 보내고 데이터를 가져오거나 저장할 수 있다는 것을 배웠습니다.
2. 비동기 처리: async와 await를 사용하여 서버 응답을 기다린 후 다음 작업을 실행하는 방법을 익혔습니다.
3. JSON과 DOM: 서버에서 받은 JSON 데이터를 JavaScript 객체로 변환하고, 이를 화면에 출력하는 과정을 배웠습니다.

## 5. AI / Search Usage

- 사용 도구: ChatGPT
- 사용 목적: Fetch API 학습, 코드 작성 및 수정, 오류 해결
- 도움을 받은 부분 GET, POST, PUT, DELETE 구현, 검색 기능 개선, 입력값 검증

### 오류 해결 과정

1. CORS 오류: 처음에는 도서 수정에 PATCH를 사용했지만 CORS 오류가 발생했습니다. 요청 방식을 PUT으로 변경한 후 수정 기능이 정상적으로 작동했습니다.
2. 404 오류: 도서를 수정할 때 `/book/undefined`로 요청되는 문제가 있었습니다. 도서 데이터에 id가 없다는 것을 확인하고 id를 추가하여 해결했습니다.
3. API 요청 오류: 브라우저 개발자 도구의 Console에서 오류 메시지를 확인하며 요청 주소와 HTTP 요청 방식을 점검했습니다.

- 직접 진행한 작업: MockAPI 설정, 초기 데이터 입력, HTML 화면 구성, 코드 적용 및 실행 테스트, 오류 확인
- AI 코드 기여율 추정: 65%

ChatGPT를 사용하면서 코드를 제안받거나 수정하는 데 도움을 받았습니다. 제안된 코드를 직접 실행하고 결과를 확인하면서 각 기능이 어떻게 동작하는지 공부했습니다.

## 6. 문제 해결 및 느낀 점

처음에는 도서 정보를 수정하는 과정에서 CORS 오류가 발생했고, 수정과 삭제 기능을 구현할 때 도서의 id가 제대로 전달되지 않아 어려움을 겪었습니다.

오류가 발생하면 브라우저 개발자 도구에서 메시지를 확인하고 코드를 하나씩 수정하면서 문제를 해결했습니다.

특히 API 요청 방식에 따라 서버에서 처리되는 결과가 달라질 수 있다는 것을 알게 되었습니다.

## 7. 마무리

이번 과제를 하면서 기존 Array 기반 CRUD와 서버를 사용하는 CRUD의 차이를 이해할 수 있었습니다.

처음 접하는 Fetch API와 async/await가 익숙하지 않아 어려웠지만, 직접 코드를 실행하고 수정하면서 조금씩 이해할 수 있었습니다.

앞으로도 코드를 단순히 따라 작성하는 것보다 각 코드가 어떤 역할을 하는지 이해하면서 공부하고 싶습니다.