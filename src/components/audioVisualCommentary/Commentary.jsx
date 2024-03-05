import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import UpdateCommentary from "./UpdateCommentary";
import DeleteCommentary from "./DeleteCommentary";
import "./commentary.css";

const Commentary = (props) => {
  const { getCommentary, comments, checkLogin, user, getUser } =
    useContext(AuthContext);

  useEffect(() => {
    props.updateComments(props.id);
    // console.log(props.updateComments());
  }, []);

  useEffect(() => {
    checkLogin();
    getUser();
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <div className="commentary px-6 py-3">
      <h2>Commentaire de la communauté : </h2>

      <div className="px-6 py-3">
        {comments &&
        
          comments.map((comment) => (
            <div key={comment._id} className="flex flex-row gap-3">
              <p className="audiovisual-title">{comment.user.pseudo} : </p>
              <p>{comment.text}</p>
              <UpdateCommentary
                comment={comment}
                updateComments={props.updateComments}
              />
              <DeleteCommentary
                comment={comment}
                updateComments={props.updateComments}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Commentary;
