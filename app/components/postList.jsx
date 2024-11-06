import '../page.module.css'
import { useEffect, useState } from 'react';
import { getData } from '../logic';
import { downVote } from '../logic';
import { upVote } from '../logic';

export default function GetList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const data = await getData(posts);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }

  const handleUpVote = async (postId) => {
    upVote(postId);
    console.log("Upvoting post with ID: ", postId);
  };

  const handleDownVote = async (postId) => {
    downVote(postId);
    console.log("Downvoting post with ID: ", postId);
  };

  return (
    <ul className="list-group list-group-flush">
      {posts.map((post) => (
        <li key={post.id} className="row align-items-center">
          <a className="col" target="_blank" rel="noopener noreferrer" href={post.url}>
            <h2>{post.title}</h2>
            <span>{post.url}</span>
          </a>
          <div id="voting" className="col-2">
            <div className="row text-center justify-content-center">
              <button type="button" className="btn" onClick={() => handleUpVote(post.id)}>
                <ion-icon name="caret-up"></ion-icon>
              </button>
              <p className="votes" id={`votes-${post.id}`}>{post.votes}</p>
              <button type="button" className="btn" onClick={() => handleDownVote(post.id)}>
                <ion-icon name="caret-down"></ion-icon>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
