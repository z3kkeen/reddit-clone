export async function getData() {
  // Get data from backend
  const response = await fetch("http://127.0.0.1:3000/posts");
  const data = await response.json();

  return data;
}



export async function upVote(postId) {
  await fetch(`http://localhost:3000/posts/${postId}/upvote`, {
    method: "PATCH"
  })
 
}

export async function downVote(postId) {
  await fetch(`http://localhost:3000/posts/${postId}/downvote`, {
    method: "PATCH"
  })
 
}

export async function newPost(title, url) {
  console.log('i wanna post!!');

  const response = await fetch("http://127.0.0.1:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      url: url,
      votes: 0,
    }),
  });

  if (!response.ok) {
    console.error("Failed to create new post");
  }
}


