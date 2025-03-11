import Comment from "../models/Comment.js";
import CV from "../models/CV.js";
import getCvResource from "./get_cv_resource.js";
import getCommentResource from "./get_comment_resource.js";
import Recruiter from "../models/Recruiter.js";
import getRecruiterResource from "./get_recruiter_resource.js";
export default {
  attributes: { exclude: ["CV_ID", "recruiter_ID", "user_ID", "updatedAt"] },
  include: [
    { model: Comment, ...getCommentResource },
    { model: CV, ...getCvResource },
    { model: Recruiter, ...getRecruiterResource },
  ],
};
