import Comment from "../models/Comment.js";
import CV from "../models/CV.js";
import getCvResource from "./get_cv_resource.js";
import getCommentResource from "./get_comment_resource.js";
export default {
  attributes: { exclude: ["CV_ID"] },
  include: [
    { model: Comment, ...getCommentResource },
    { model: CV, ...getCvResource },
  ],
};
