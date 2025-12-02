import { createSelector } from "@ngrx/store";
import { postFeature } from "./post.reducer";

export const selectPosts = createSelector(
  postFeature.selectPosts,
  (posts) => {return posts}
)