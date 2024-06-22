import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ recipeId, token }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/api/comments/${recipeId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [recipeId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`http://localhost:1234/api/comments/${recipeId}/comments`, { text: newComment }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComments(response.data.comments);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="comments-section">
            <h3>Комментарии</h3>
            {token && (
                <div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий..."
                    />
                    <button onClick={handleAddComment}>Отправить</button>
                </div>
            )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p>Человек</p>
                        <p><strong>Комментарий:</strong> {comment.text}</p>
                        <p className="commentDate">{new Date(comment.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
