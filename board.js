const form = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const list = document.getElementById("list");

let posts = [];

function render() {
  list.innerHTML = posts
    .map(
      (p, i) => `
      <li class="board-item">
        <div class="board-item-head">
          <strong>${escapeHtml(p.title)}</strong>
          <button class="btn small" data-index="${i}">삭제</button>
        </div>
        <p>${escapeHtml(p.content)}</p>
        <span class="board-meta">${p.date}</span>
      </li>
    `,
    )
    .join("");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[m];
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  posts.unshift({
    title: titleInput.value.trim(),
    content: contentInput.value.trim(),
    date: new Date().toLocaleString("ko-KR"),
  });

  titleInput.value = "";
  contentInput.value = "";
  render();
});

list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;

  const idx = Number(btn.dataset.index);
  posts.splice(idx, 1);
  render();
});

render();
