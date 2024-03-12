getUsers().then(() => getPosts());

function getUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((users) => {
        let usersUI = document.querySelector(".users");
        return new Promise((resolve, reject) => {
          users.map((user) => {
            usersUI.innerHTML += `
              <div class="user" onclick="getPosts(${user.id}, this)" >
                <div>username : ${user.name}</div>
                <div>email : ${user.email}</div>
              </div>
            `;
          });
        });
      });
    resolve();
  });
}

function getPosts(userID = null, elem = null) {
  let endPoint = userID ? "?userId=" + userID : "";
  endPoint && activeElem(elem);
  fetch(`https://jsonplaceholder.typicode.com/posts${endPoint}`)
    .then((res) => res.json())
    .then((posts) => {
      // console.log(posts);
      let postsUI = document.querySelector(".posts");
      postsUI.innerHTML = "Number of posts: " + posts.length;
      posts.map((post) => {
        postsUI.innerHTML += `
          <div class="post">
            <div class="post_title">${post.title}</div>
            <div class="post_body">${post.body}</div>
          </div>
        `;
      });
    });
}

function activeElem(elem) {
  document.querySelectorAll(".active").forEach((user) => {
    user.classList.remove("active");
  });
  elem.classList.add("active");
}
