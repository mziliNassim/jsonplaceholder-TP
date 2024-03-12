getUsers().then(() => getPosts());

function getUsers() {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      let { data: users } = response;
      let usersUI = document.querySelector(".users");

      users.map((user) => {
        usersUI.innerHTML += `
        <div class="user" onclick="getPosts(${user.id}, this)" >
          <div>username : ${user.name}</div>
          <div>email : ${user.email}</div>
        </div>
      `;
      });
    })
    .catch((err) => console.log(err));
}

function getPosts(userID = null, elem = null) {
  let endPoint = userID ? "?userId=" + userID : "";
  endPoint && activeElem(elem);
  axios
    .get(`https://jsonplaceholder.typicode.com/posts${endPoint}`)
    .then((response) => {
      let { data: posts } = response;
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
