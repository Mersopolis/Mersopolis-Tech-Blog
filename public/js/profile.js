const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogPost-title').value.trim();
  const content = document.querySelector('#blogPost-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogPosts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blogPost-list')
  .addEventListener('click', delButtonHandler);