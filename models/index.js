import User from "./User.js";
import CV from "./CV.js";
import Recruiter from "./Recruiter.js";
import Review from "./Review.js";
import Comment from "./Comment.js";
import Session from "./Session.js";

console.log("===========", "defining relations", "=============");
// Establishing relations
Review.hasMany(Comment, { foreignKey: "review_ID" });
Comment.belongsTo(Review, { foreignKey: "review_ID" });

Review.belongsTo(User, { foreignKey: "user_ID" });
User.hasMany(Review, { foreignKey: "user_ID" });

Review.belongsTo(Recruiter, { foreignKey: "recruiter_ID" });
Recruiter.hasMany(Review, { foreignKey: "recruiter_ID" });

CV.hasOne(Review, { foreignKey: { name: "CV_ID", allowNull: false } });
Review.belongsTo(CV, { foreignKey: "CV_ID" });

User.hasMany(CV, { foreignKey: "user_ID" });
CV.belongsTo(User, { foreignKey: "user_ID" });
