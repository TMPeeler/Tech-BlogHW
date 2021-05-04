const newComment = async (event) => {
    event.preventDefault();
    const text = document.querySelector('#comment-text').value.trim();

    if (text) {
      const response = await fetch(`/api/comments/new`, {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        document.location.replace('/');
        // is this supposed to be the post route???
      } else {
        alert('Failed to create project');
      }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComment);