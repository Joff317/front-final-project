import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import UpdateCommentary from "./UpdateCommentary";
import DeleteCommentary from "./DeleteCommentary";

const Commentary = (props) => {
  const { getCommentary, comments, checkLogin, user, getUser } =
    useContext(AuthContext);

  useEffect(() => {
    props.updateComments(props.id);
  }, []);

  useEffect(() => {
    checkLogin();
    getUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <h2>Commentaire de la communauté : </h2>

      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-row gap-2">
            <p>{comment.user.pseudo} : </p>
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
