import axios from "axios";
import React, {useState} from "react";

const API_URL = "http://localhost:4000";

const PostCreate = () => {
    const [title, setTitle] = useState("");
    async function onSubmit (event) {
        event.preventDefault();
        await axios.post(`${API_URL}/posts`, {
            title
        })

        setTitle("");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input onChange={e => setTitle(e.target.value)} value={title} className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default PostCreate;