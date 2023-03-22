const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-post-title").value.trim();
  const content = document.querySelector("#blog-post-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/blogPosts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogPosts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".new-blog-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".btn-danger")
  .addEventListener("click", delButtonHandler);
