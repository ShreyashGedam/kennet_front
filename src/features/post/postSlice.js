import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EDNPOINT } from "../endpoint";

const initialState = {
  posts: [],
  loading: false,
  error: false,
  searchPage: false,
  commenetloading: false,
};

export const addPost = createAsyncThunk(
  "post",
  async (data, { rejectWithValue }) => {
    return await axios
      .post(`${EDNPOINT}/post/${data.userId}`, { post: data.post })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response));
  }
);

export const getPost = createAsyncThunk(
  "getPost",
  async (data, { rejectWithValue }) => {
    return await axios
      .get(`${EDNPOINT}/post`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response));
  }
);

export const addComment = createAsyncThunk(
  "comment",
  async (data, { rejectWithValue }) => {
    return await axios
      .post(`${EDNPOINT}/comment`, {
        comment: data.comment,
        userId: data.userId,
        postId: data.postId,
        parentId: data.parentId || null,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response));
  }
);

export const searchPost = createAsyncThunk(
  "searchPost",
  async (data, { rejectWithValue }) => {
    return await axios
      .post(`${EDNPOINT}/post/search`, data)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response));
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchPage: (state) => {
      state.searchPage = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = [...state.posts, payload];
      })
      .addCase(addPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(searchPost.pending, (state) => {
        state.searchPage = true;
        state.loading = true;
      })
      .addCase(searchPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload;
      })
      .addCase(searchPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addComment.pending, (state) => {
        state.commenetloading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.commenetloading = false;
        state.posts = state.posts.map((e) =>
          e._id === payload.postId
            ? { ...e, comments: [...e.comments, payload] }
            : e
        );
      })
      .addCase(addComment.rejected, (state) => {
        state.commenetloading = false;
        state.error = true;
      });
  },
});

export const { setSearchPage } = postSlice.actions;

export default postSlice.reducer;
