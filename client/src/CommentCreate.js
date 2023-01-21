import axios from "axios";
import React, { useState } from "react";

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post(`http://localhost:4001/posts/${postId}/comment`, {
    content
  })
  setContent("");
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
