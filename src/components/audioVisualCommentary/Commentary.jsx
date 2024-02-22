import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const Commentary = (props) => {
  const { getCommentary, comments, checkLogin, user, getUser } =
    useContext(AuthContext);

  useEffect(() => {
    getCommentary(props.id);
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
            <p>Lorem ipsum dolor sit amet.</p>
            <p>{user._id}</p>
            <p>{comment._id}</p>
            <p>Lorem ipsum dolor sit amet.</p>
            {user._id === comment.user._id ? (<button>Modifier</button>) : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentary;
