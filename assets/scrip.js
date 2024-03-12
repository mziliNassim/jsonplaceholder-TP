(function getUsers() {
  let request = new XMLHttpRequest();
  request.open("GET", `https://jsonplaceholder.typicode.com/users`);
  request.setRequestHeader("Content-type", "application/json");
  request.responseType = "json";

  request.addEventListener("load", () => {
    if (request.status >= 200 && request.status < 300) {
      let allUsers = request.response;
      let usersUI = document.querySelector(".users");
      usersUI.innerHTML += "";
      allUsers.map((user) => {
        usersUI.innerHTML += `
          <div class="user" onclick="getPosts(${user.id}, this)" >
            <div>username : ${user.name}</div>
            <div>email : ${user.email}</div>
          </div>
        `;
      });
    } else {
      alert("Error 404");
      location.href = "../";
    }
  });
  request.send();
})();

let getPosts;
(getPosts = function (id = null, elem = null) {
  unActiveUsers();
  let endPoint = id ? `?userId=${id}` : "";
  let request = new XMLHttpRequest();
  request.open("GET", `https://jsonplaceholder.typicode.com/posts${endPoint}`);
  request.setRequestHeader("Content-type", "application/json");
  request.responseType = "json";

  request.addEventListener("load", () => {
    if (request.status >= 200 && request.status < 300) {
      let allPosts = request.response;
      let postsUI = document.querySelector(".posts");
      elem && elem.classList.add("active");
      postsUI.innerHTML = "";
      allPosts.map((post) => {
        postsUI.innerHTML += `
          <div class="post">
            <div class="post_title">${post.title}</div>
            <div class="post_body">${post.body}</div>
          </div>
        `;
      });
    } else {
      alert("Error 404");
      location.href = "../";
    }
  });
  request.send();
})();

function unActiveUsers() {
  document.querySelectorAll(".active").forEach((user) => {
    user.classList.remove("active");
  });
}
