import axios from "axios";

const rootEl = document.querySelector(".root");
const templates = {
  postList: document.querySelector("#post-list").content,
  postItem: document.querySelector("#post-item").content,
  postContent: document.querySelector("#post-content").content
};
function render(fragment) {
  rootEl.textContent = "";
  rootEl.appendChild(fragment);
}
async function indexPage() {
  const res = await axios.get("http://localhost:3000/posts");
  const listFragment = document.importNode(templates.postList, true);
  res.data.forEach(post => {
    const fragment = document.importNode(templates.postItem, true);
    const pEl = fragment.querySelector(".post-item__title");
    pEl.textContent = post.title;
    pEl.addEventListener("click", e => {
      postContentPage(post.id);
    });
    listFragment.querySelector(".post-list").appendChild(fragment);
  });
  render(listFragment)
}

async function postContentPage(postId) {
  const res = await axios.get(`http://localhost:3000/posts/${postId}`);
  const fragment = document.importNode(templates.postContent, true);
  fragment.querySelector(".post-content__title").textContent = res.data.title;
  fragment.querySelector(".post-content__body").textContent = res.data.body;
  fragment.querySelector(".post-content__back-btn").addEventListener('click', e => {
    indexPage();
  })
  render(fragment)
}
indexPage();
// axios.get('http://localhost:3000/posts').then(res => {
//   const listFragment = document햣 .importNode(document.querySelector('#post-list').content, true);
//   res.data.forEach(post => {
//     const fragment = document.importNode(document.querySelector('#post-item').content, true);
//     const pEl = fragment.querySelector('.post-item__title')
//     pEl.textContent = post.title;
//     listFragment.querySelector('.post-list').appendChild(fragment);
//   })
//   document.querySelector('.root').appendChild(listFragment);
// })
