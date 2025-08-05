
document.addEventListener("DOMContentLoaded", function () {
  
  let postList = document.getElementById("post-list");
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (postList) {
    if (posts.length === 0) {
      postList.innerHTML = "<p>No posts found.</p>";
    } else {
      posts.forEach((post, index) => {
        let postItem = document.createElement("div");
        postItem.classList.add("post-item");

        let postTitle = document.createElement("h3");
        postTitle.innerHTML = `<a href="post.html?id=${index}">${post.title}</a>`;

        let postContent = document.createElement("p");
        postContent.textContent = post.content;

        postItem.appendChild(postTitle);
        postItem.appendChild(postContent);

        if (post.image) {
          let postImage = document.createElement("img");
          postImage.src = post.image;
          postImage.alt = "Post Image";
          postItem.appendChild(postImage);
        }

        postList.appendChild(postItem);
      });
    }
  }

  let postId = new URLSearchParams(window.location.search).get('id');
  let index = parseInt(postId, 10);
  

  if (!isNaN(index) && index >= 0 && index < posts.length) {
  let post = posts[index];
  // Display post title and content here
} else {
  // Show "Post not found."
}

  // --- Handle new post submission on new.html ---
  let postForm = document.getElementById("post-form");
  if (postForm) {
    postForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let title = document.getElementById("title");
      let content = document.getElementById("content");
      let image = document.getElementById("image");

      if (!title.value.trim() || !content.value.trim()) {
        alert("Title and content must not be empty!");
        return;
      }

      let newPost = {
        title: title.value.trim(),
        content: content.value.trim(),
        image: image?.value.trim() || ""
      };

      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      window.location.replace("index.html");
    });
  }

  // --- Handle post details and editing on post.html ---
  let postDetails = document.getElementById("post-details");
  let editBUTTON = document.getElementById("edit-btn");
  let deleteButton = document.getElementById("delete-button");

  if (postDetails && editBUTTON && deleteButton) {
    let postId = new URLSearchParams(window.location.search).get('id');
    let index = parseInt(postId, 10);

    let post = posts[index];

    if (post) {
      postDetails.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      `;

      editBUTTON.addEventListener('click', function () {
        postDetails.innerHTML = `
          <h3>Edit Post</h3>
          <label for="edit-title">Title:</label><br>
          <input type="text" id="edit-title" value="${post.title}" required><br>
          <label for="edit-content">Content:</label><br>
          <textarea id="edit-content" required>${post.content}</textarea><br>
          <button id="save-btn">Save Changes</button>
        `;

        let saveButton = document.getElementById("save-btn");
        saveButton.addEventListener('click', function () {
          let newTitle = document.getElementById("edit-title").value.trim();
          let newContent = document.getElementById("edit-content").value.trim();

          if (!newTitle || !newContent) {
            alert("Both fields are required.");
            return;
          }

          post.title = newTitle;
          post.content = newContent;

          posts[index] = post;
          localStorage.setItem("posts", JSON.stringify(posts));

          window.location.replace("index.html");
        });
      });

      deleteButton.addEventListener("click", function () {
        if (confirm("Delete this post?")) {
          posts.splice(index, 1);
          localStorage.setItem("posts", JSON.stringify(posts));
          window.location.replace("index.html");
        }
      });

    } else {
      postDetails.innerHTML = "<p>Post not found.</p>";
    }
  }
});







