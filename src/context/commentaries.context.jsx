import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentariesContext = createContext();

function CommentariesProviderWrapper(props) {
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [updateComments, setUpdateComments] = useState();
  const navigate = useNavigate();

  const BACK_API_URL = process.env.API_URL;

  const getCommentary = async (audioVisualId) => {
    console.log("getCommentary", audioVisualId);
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${BACK_API_URL}/api/commentary/${audioVisualId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log("COMMENTARYYYYY", res.data);
        setComments(res.data.comments);
      })
      .catch((err) => console.log(err));
  };

  const createCommentary = (audiovisualId, text) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${BACK_API_URL}/api/commentary/${audiovisualId}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPostComments(res.data);
        return "Commentary posted";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCommentary = (audioVisualId, commentId, text) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(
        `${BACK_API_URL}/api/commentary/${audioVisualId}/${commentId}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        console.log("Commeeeeeents", comments);
        const result = comments.map((comment) => {
          if (comment._id === res.data.data._id) {
            return res.data.data;
          } else {
            return comment;
          }
        });
        setComments(result);
        //   setComments([...comments, res.data.data]);
        return "Commentary updated";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCommentary = (audioVisualId, commentId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${BACK_API_URL}/api/commentary/${audioVisualId}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const deleteComment = comments.filter(
          (comment) => comment._id !== commentId
        );
        setComments(deleteComment);
        return "Comment deleted";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CommentariesContext.Provider
      value={{
        value: "CommentariesValue",
        getCommentary,
        comments,
        createCommentary,
        postComments,
        updateCommentary,
        updateComments,
        deleteCommentary,
      }}
    >
      {props.children}
    </CommentariesContext.Provider>
  );
}

export { CommentariesContext, CommentariesProviderWrapper };
