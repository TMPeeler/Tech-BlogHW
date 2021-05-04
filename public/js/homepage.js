

const newPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
    // const userId = 1;
    // const userId = req.session.user_id;

    if (title && text ) {
      const response = await fetch(`/api/posts/new`, {
        method: 'POST',
        body: JSON.stringify({ title, text}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        document.location.replace('/api/posts/dashboard');
        // is this supposed to be the post route???
      } else {
        alert('Failed to create project');
      }
    }
};
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/post/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/api/posts/dashboard');
//       } else {
//         alert('Failed to delete post');
//       }
//     }
//   };

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPost);

//   document
//     .querySelector('.post-list')
//     .addEventListener('click', delButtonHandler);