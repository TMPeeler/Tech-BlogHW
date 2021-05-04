const newComment = async (event) => {
    event.preventDefault();
    const text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post-id').value.trim();

    if (text ) {
      const response = await fetch(`/api/comments/new`, {
        method: 'POST',
        body: JSON.stringify({text, post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        document.location.replace('/api/posts/dashboard');
        // is this supposed to be the post route???
      } else {
        alert('Failed to create comment');
      }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newComment);