import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const DeleteCommentary = (props) => {
  const { comment } = props;
  const { user, deleteCommentary } = useContext(AuthContext);

  const handleDelete = async (audioVisualId, commentId) => {
    await deleteCommentary(audioVisualId, commentId);
  };

  return (
    <>
      {user._id === comment.user._id ? (
        <div className="flex justify-center">
          <button id="delete-commentary" onClick={() => handleDelete(props._id, comment._id)}>
          X
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteCommentary;
