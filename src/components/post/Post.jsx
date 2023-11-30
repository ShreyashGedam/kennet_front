import { Button, Input, Spinner } from "@chakra-ui/react";
import styles from "./Post.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPost } from "../../features/post/postSlice";
import { SinglePost } from "../SinglePost/SinglePost";

export const Post = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const logged = JSON.parse(localStorage.getItem("userInfo"));
  const { posts, searchPage, loading } = useSelector((state) => state.posts);

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
      {loading ? (
        <div className={styles.loading}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className={styles.post}>
              <p>No Posts related to your search</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </div>
  );
};
