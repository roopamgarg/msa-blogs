import React from 'react';

const CommentList = ({comments}) => {
    const renderComments = comments.map((comment) => {
        let content;
        if(comment.status === "APPROVED"){
            content = comment.content
        }else if(comment.status === "REJECTED"){
            content = "This comment has been Rejected"
        }else{
            content = "This comment is awaiting moderation"
        }
        return (
            <li key={comment.id}>

                {content}
            </li>
        )
    })
    return (
        <div>
            <h5>Comments</h5>
            <ul>
                {renderComments}
            </ul>
        </div>
    )
}

export default CommentList;