import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../../features/user/userSlice";
import { Post } from "../post/Post";
import { Button, Input } from "@chakra-ui/react";
import { searchPost } from "../../features/post/postSlice";
import Search from "../search/Search";

export const Home = () => {
  const logged = JSON.parse(localStorage.getItem("userInfo"));
  const [searchRes, setSearchRes] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("userInfo");
    navigate("/auth");
  };

  const handleSearch = () => {
    if (!search) return;
    dispatch(searchPost({ text: search }));
    setSearchRes(true);
  };

  useEffect(() => {
    if (!logged) {
      navigate("/auth");
    } else {
      dispatch(setUser(logged));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <p className={styles.userName}>{logged?.name}</p>
        <p onClick={handleLogout}>Log out</p>
      </div>
      <div className={styles.main}>
        <p>Search Post :</p>
        <Input
          placeholder="Search"
          size="sm"
          w={250}
          marginLeft={2}
          marginRight={2}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button colorScheme="teal" size="sm" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {searchRes ? <Search setSearchRes={setSearchRes} /> : <Post />}
    </div>
  );
};
