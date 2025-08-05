document.addEventListener("DOMContentLoaded", function () {
  let postList = document.getElementById("post-list");
  
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (posts.length === 0) {
    postList.innerHTML = "<p>No posts found.</p>";
    return;
  }

  posts.forEach((post, index) => {
    let postItem = document.createElement("div");
    postItem.className.add("post-item");

    let postTitle = document.createElement("h3");

    postTitle.inner = `<a href="post.html?id=${index}">${post.title}</a>`;

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

    let postId = new URLSearchParams(window.location.search).get('id');
    let index = parseInt(postId, 10);

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let post = posts[index];

    if (post) {
        postDetails.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
         `;

         editBUTTON.addEventListener('click', function() {
            let editForm = `
            <h3>Edit Post</h3>
            <label for="edit-title">Title:</label>
            <input type="text" id="edit-title" value="${post.title}" required>
            <label for= "edit-content">Content:</label>
            <textarea id= "edit-content" required>${post.content}</textarea>
            <button id="save-btn">Save Changes</button>
             `;

             postDetails.innerHTML = editForm;

             let saveButton = document.getElementById("save-btn");
             saveButton.addEventListener('click', function () {
                let newTitle = document.getElementById('edit-title').value;
                let newContent = document.getElementById('edit-content').value;

                post.title = newTitle;
                post.content = newContent;

                posts[index] = post;
                localStorage.setItem('posts', JSON.stringify(posts));

                window.location.replace("index.html");

   
             });


         });

    } else {
        postDetails.innerHTML = "<p>Post not found.</p>";
    }

});






