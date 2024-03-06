import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

const PostCommentary = (props) => {
  const { isLoggedIn, checkLogin, createCommentary } = useContext(AuthContext);
  const [text, setText] = useState("");

  useEffect(() => {
    checkLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const audioVisualId = props.id;
    await createCommentary(audioVisualId, text);
    setText("");
    props.updateComments(audioVisualId);
  };

  if (isLoggedIn) {
    return (
      <div>
        <h2 className="mb-2 mt-8 text-xl">Poster un commentaire</h2>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-row">
            <div className="px-2">
              <input
                className="px-1 mr-2 update-input text-white rounded-md"
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <button className="rounded px-2" type="submit">
            <i className="fa fa-check fa-lg"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default PostCommentary;
