import { Button, Input } from "@chakra-ui/react";
import styles from "./Post.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPost } from "../../features/post/postSlice";
import { SinglePost } from "../SinglePost/SinglePost";

export const Post = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const logged = JSON.parse(localStorage.getItem("userInfo"));
  const { posts } = useSelector((state) => state.posts);
  const { searchPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!searchPage) dispatch(getPost());
  }, []);

  const handleClick = () => {
    if (!message) return;
    dispatch(addPost({ post: message, userId: logged._id }));
    setMessage("");
  };

  return (
    <div className={styles.container}>
      {!searchPage && (
        <div className={styles.inputbox}>
          <Input
            value={message}
            placeholder="Type here..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button marginLeft={10} colorScheme="blue" onClick={handleClick}>
            Add Post
          </Button>
        </div>
      )}
      {posts.map((e) => (
        <div key={e._id}>
          <SinglePost
            postMessage={e.post}
            userName={e.userId.name}
            date={e.updatedAt}
            comments={e.comments}
            postId={e._id}
            userId={e.userId._id}
          />
        </div>
      ))}
    </div>
  );
};
