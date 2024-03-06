import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";

const UpdateCommentary = (props) => {
  const { comment, setIsEditing, isEditing } = props;
  const { user, updateCommentary, getCommentary } = useContext(AuthContext);

  const [newText, setNewText] = useState(comment.text);
  // const [isEditing, setIsEditing] = useState(false);

  const handleUpdateComment = async (audioVisualId, commentId, newText) => {
    await updateCommentary(audioVisualId, commentId, newText);
    setIsEditing(false);
    props.updateComments(props._id);
  };

  return (
    <>
      {user._id === comment.user._id ? (
        <>
          <button onClick={() => setIsEditing(!isEditing)}>
            {!isEditing ? (
              <i className="fa fa-pen-to-square fa-lg"></i>
            ) : (
              <p className="cancel-update">Anuuler</p>
            )}
          </button>
          {isEditing && (
            <div>
              {/* <label>Modifier :</label> */}
              <input
                className="px-1 mr-2 update-input text-white rounded-md"
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button
                onClick={() =>
                  handleUpdateComment(props._id, comment._id, newText)
                }
              >
                <i className="fa fa-check fa-lg"></i>
              </button>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UpdateCommentary;
