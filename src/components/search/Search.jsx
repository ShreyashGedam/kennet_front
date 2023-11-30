import { useDispatch, useSelector } from "react-redux";
import { Post } from "../post/Post";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { setSearchPage } from "../../features/post/postSlice";

function Search(pros) {
  const { setSearchRes } = pros;
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.posts);

  const handleClick = () => {
    setSearchRes(false);
    dispatch(setSearchPage());
  };

  if (!loading) console.log(posts);

  return (
    <div>
      <Button colorScheme="purple" size="sm" onClick={handleClick}>
        All Posts
      </Button>
      <Post />
    </div>
  );
}

export default Search;
