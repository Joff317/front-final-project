import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

const UpdateCommentary = (props) => {
  const { comment } = props;
  const { user, updateCommentary } = useContext(AuthContext);

  const [newText, setNewText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateComment = (audioVisualId, commentId, newText) => {
    updateCommentary(audioVisualId, commentId, newText);
    setIsEditing(false);
  };

  return (
    <>
      {user._id === comment.user._id ? (
        <>
          <button onClick={() => setIsEditing(!isEditing)}>Modifier</button>
          {isEditing && (
            <div>
              <label>Modifier le commentaire</label>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button
                onClick={() =>
                  handleUpdateComment(props._id, comment._id, newText)
                }
              >
                Enregistrer
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
