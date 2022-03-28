import { useEffect, useState } from "react";
import { initialAuthState } from "../../AuthProvider";
import useAuthContext from "../../AuthProvider/hooks/useAuthContext";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";

const Success = () => {
  const {
    state: { username, refreshToken },
    setState
  } = useAuthContext();
  const request = useRequest();
  const [showPosts, setShowPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  const getUserPosts = async () => {
    const response = await request('posts', { authRequired: true });
    setPosts(response.data);
  };

  useEffect(() => {
    if (showPosts) {
      getUserPosts();
    }
  }, [showPosts]);

  const handleLogout = async () => {
    try {
      await request('logout', {
        method: 'DELETE',
        body: {
          token: refreshToken,
        },
      });

      setState(initialAuthState.state);
    } catch(err) {
      alert(err);
    }
  };

  const handleViewPostsChange = () => setShowPosts(prev => !prev);

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <h1>hey {username}, you are now logged in!</h1>
      <div className="flex items-center gap-2">
        <Button theme="primary" onClick={handleViewPostsChange}>{showPosts ? 'Hide' : 'View'} posts</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {showPosts && posts.length > 0 && (
        <div>
          <h2 className="font-bold underline">Posts</h2>
          <ul>
            {posts.map(({ name, title }) => (
              <li key={name}>Title: {title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Success;
