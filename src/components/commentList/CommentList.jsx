import { useSelector } from "react-redux";
import styles from "./CommentList.module.css";

export const CommentList = (props) => {
  const { comments } = props;
  const { user } = useSelector((state) => state.user);
  return (
    <div className={styles.container}>
      {comments.map((e) => (
        <div className={styles.main} key={e._id}>
          <div className={styles.heading}>
            <p className={styles.comment}>{e.comment}</p>
            <p>by {e.userId.name || user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
