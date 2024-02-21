import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

const PostCommentary = (props) => {
  const { isLoggedIn, checkLogin, createCommentary } = useContext(AuthContext);
  const [text, setText] = useState("");

  useEffect(() => {
    createCommentary(props.id);
  });

  useEffect(() => {
    checkLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCommentary(text, token);
  };

  if (isLoggedIn) {
    return (
      <div>
        <h2>Poster un commentaire</h2>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label>Commentaire: </label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <button className="bg-purple-500 rounded px-2" type="submit">
            Poster un commentaire
          </button>
        </form>
      </div>
    );
  }
};

export default PostCommentary;
