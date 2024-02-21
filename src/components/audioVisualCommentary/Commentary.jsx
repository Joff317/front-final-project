import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const Commentary = (props) => {
  const { getCommentary, comments, checkLogin } = useContext(AuthContext);

  useEffect(() => {
    getCommentary(props.id);
  }, []);

  useEffect(() => {
    checkLogin();
  });
  return (
    <div>
      <h2>Commentaire de la communauté : </h2>

      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-row">
            <p>{comment.user.pseudo} : </p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentary;
