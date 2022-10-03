const loadCommentsBtn = document.getElementById("loadCommentsBtn");
const commentForm = document.querySelector("#comments-form form");
const commentsSection = document.getElementById("comments");
const commentsSectionText = document.querySelector("#comments p");
const commentTitle = document.getElementById("title");
const commentText = document.getElementById("text");

function createCommentList(comments) {
  const commentList = document.createElement("ul");
  for (const comment of comments) {
    const commentListItem = document.createElement("li");
    commentListItem.innerHTML = `
		<article class="comment-item">
		<h2> ${comment.title} </h2>
		<p> ${comment.text} </p>
		<button class="deleteBtn" data-commentid="${comment._id}" class="btn btn-alt">Delete Post</button>
		</article>
		`;
    commentList.append(commentListItem);
  }
  return commentList;
}

async function loadComments(e) {
  const postId = loadCommentsBtn.dataset.postid.trim();
  try {
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert("fetch failed");
      return;
    } else {
      const resData = await response.json();

      if (resData && resData.length > 0) {
        const allComments = createCommentList(resData);
        commentsSection.innerHTML = "";
        commentsSection.appendChild(allComments);
        const deleteBtns = document.querySelectorAll("button.deleteBtn");
        for (const btn of deleteBtns) {
          btn.addEventListener("click", deleteComment);
        }
      } else {
        commentsSectionText.textContent = "NO COMMENTS! ADD ONE!";
      }
    }
  } catch (error) {
    alert(error);
  }
}

async function saveComment(e) {
  e.preventDefault();
  const postId = commentForm.dataset.postid.trim();
  const comment = { title: commentTitle.value, text: commentText.value };
  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      loadComments();
    } else {
      alert("COULD NOT PERFORM ACTION");
    }
    commentTitle.value = "";
    commentText.value = "";
  } catch (error) {
    alert(error);
  }
}

async function deleteComment(e) {
  const commentId = e.target.dataset.commentid;
  await fetch(`/comments/${commentId}/delete`, {
		method: 'POST',
		body: JSON.stringify(commentId),
	});
  loadComments();
}

loadCommentsBtn.addEventListener("click", loadComments);
commentForm.addEventListener("submit", saveComment);
