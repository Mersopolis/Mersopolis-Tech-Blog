const newFormHandler = async (event) => {
  event.preventDefault();

  const newComment = document.querySelector("#new-comment").value;

  if (newComment) {
    const response = await fetch(`/api/blogPosts/${id}`, {
      method: "POST",
      body: JSON.stringify({ newComment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`../blogpost/${id}`);
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
