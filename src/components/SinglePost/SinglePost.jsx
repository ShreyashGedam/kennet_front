import { useState } from "react";
import styles from "./SinglePost.module.css";
import { Button, Input } from "@chakra-ui/react";
import { CommentList } from "../commentList/CommentList";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../features/post/postSlice";

export const SinglePost = (props) => {
  const { postMessage, userName, date, comments, postId } = props;
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const newDate = new Date(date);
  const options = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const handleClick = () => {
    if (!comment) return;
    const data = { comment: comment, userId: user._id, postId: postId };
    dispatch(addComment(data));
    setComment("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.headings}>
          <p>{postMessage}</p>
          <div>
            <p className={styles.user}>by {userName}</p>
            <p>{newDate.toLocaleString("en-US", options)}</p>
          </div>
        </div>
        {commentBox ? (
          <div className={styles.commentSection}>
            <div className={styles.commentBox}>
              <Input
                placeholder="Add comment"
                size="sm"
                w={"70vw"}
                onChange={(e) => setComment(e.target.value)}
                autoFocus
                value={comment}
              />
              <Button
                colorScheme="teal"
                size="sm"
                marginLeft={10}
                onClick={handleClick}
              >
                Save
              </Button>
            </div>
            {comments.length > 0 && <CommentList comments={comments} />}
          </div>
        ) : (
          <p
            className={styles.commentButton}
            onClick={() => setCommentBox(true)}
          >
            Add comment
          </p>
        )}
      </div>
    </div>
  );
};
