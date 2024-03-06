import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import UpdateCommentary from "./UpdateCommentary";
import DeleteCommentary from "./DeleteCommentary";
import "./commentary.css";

const Commentary = (props) => {
  const {getCommentary, comments, checkLogin, user, getUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getCommentary(props.id);
    // console.log(props.updateComments());
  }, [props.id]);

  useEffect(() => {
    checkLogin();
    getUser();
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <div className="commentary">
      <h2 className="mb-2 text-xl">Commentaire de la communauté : </h2>

      <div className="px-6 sm:py-3">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="flex flex-col gap-1 mb-2">
              <p className="audiovisual-title">{comment.user.pseudo} : </p>
              <p className="px-2">{comment.text}</p>
              <div
                className={`flex gap-2 px-2 ${
                  isEditing ? "max-sm:flex-col" : "max-sm:flex-row"
                } `}
              >
                <UpdateCommentary
                  comment={comment}
                  updateComments={props.updateComments}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                />
                <DeleteCommentary
                  comment={comment}
                  updateComments={props.updateComments}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Commentary;
