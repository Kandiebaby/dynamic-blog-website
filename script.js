document.addEventListener("DOMContentLoaded", function () {
  let postList = document.getElementById("post-list");
  
  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  if (posts.length === 0) {
    postList.innerHTML = "<p>No blog posts found.</p>";
    return;
  }

  posts.forEach((post, index) => {
    let postDiv = document.createElement("div");
    postDiv.className = "post-item";
    postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <a href="post.html?index=${index}">View/Edit</a>
     `;
     postList.appendChild(postDiv);
  });
});

