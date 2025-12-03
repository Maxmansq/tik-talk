import { createSelector } from "@ngrx/store";
import { inputCommentFeature, inputPostFeature, postFeature } from "./post.reducer";

export const selectPosts = createSelector(
  postFeature.selectPosts,
  (posts) => {return posts}
)

export const selectInputPost = createSelector(
  inputPostFeature.selectInputPostFeatureState,
  (state) => {return state.inputPost}
)

export const selectInputComment = createSelector(
  inputCommentFeature.selectInputCommentFeatureState,
  (state) => {return state.inputComment}
)