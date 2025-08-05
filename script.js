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

document.addEventListener("DOMContentLoaded", function() {
    let postList = document.getElementById("post-list");
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (posts.length === 0) {
        postList.innerHTML = "<p>No posts available.</p>";
} else {
    posts.forEach(post => {
        let postItem = document.createElement("div");
        postItem.classList.add("post-item");

        let postTitle = document.createElement("h3");
        postTitle.textContent = post.title;

        let postContent = document.createElement("p");
        postContent.textContent = post.content;

        if (post.image) {
          let postImage = document.createElement("img");
          postImage.src = post.image;
          postImage.alt = "Post Image";  
        }

        postItem.appendChild(postTitle);
        postItem.appendChild(postContent);
        if (post.image) postItem.appendChild(postImage);

        postList.appendChild(postItem);
    });

}

let postForm = document.getElementById("post-form");
if (postForm) {
    postForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let title = document.getElementById("title");
        let content = document.getElementById("content");
        let image = document.getElementById("image");

if (!title || !content) {
    alert("title and content must not be empty!");
    return;
}

let newPost = {
    title: title,
    content: content,
};

let posts = JSON.parse(localStorage.getItem("posts")) || [];

posts.push(newPost);

localStorage.setItem("posts", JSON.stringify(posts));

window.location.replace("index.html");
    });
}

});

document.addEventListener("DOMContentLoaded", function() {
    let postDetails = document.getElementById("post-details");
    let editBUTTON = document.getElementById("edit-btn");

    let postID = new URLSearchParams(window.location.search).get('id');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let post = posts[postId];

    if (post) {
        postDetails.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
         `;

         editBUTTON.addEventListener('click', function() {
            let editForm = `
            <h3>Edit Post</h3>
            <label for="edit-title">Title:</label>
            <input type="text" id="edit-title value="${post.title}" required>
            <label for= "edit-content">Content:</label>
            <textarea id= "edit-content" required>${post.content}</textarea>
            <button id="save-btn">SaveChanges</button>
             `;

             postDetails.innerHTML = editForm;

             let saveButton = document.getElementById("save-btn");
             saveButton.addEventListener('click', function () {
                let newTitle = document.getElementById('edit-title');
                let newContent = document.getElementById('edit-content');

                post.title = newTitle;
                post.content = newContent;

                post[postId] = post;
                localStorage.setitem('posts', JSON.stringify(posts));

                window.location.replace("index.html");

   
             });


         });

    } else {
        postDetails.innerHTML = "<p>Post not found.</p>";
    }

});






