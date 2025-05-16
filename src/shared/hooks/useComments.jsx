import { useState, useEffect } from "react";
import {
    getComments,
    saveComment,
    searchComment,
    updateComment,
    deleteComment
} from "../../services/api.jsx";

export const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getComments();
            if (!res.error) {
                setComments(res.data.comments || []);
            } else {
                throw new Error(res.e?.message || "Error fetching comments");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createComment = async (data) => {
        try {
            const res = await saveComment(data);
            if (!res.error) {
                await fetchComments();
                return res.data;
            } else {
                throw new Error(res.e?.message || "Error saving comment");
            }
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const findComment = async (id) => {
        try {
            const res = await searchComment(id);
            if (!res.error) {
                return res.data.comment;
            } else {
                throw new Error(res.e?.message || "Error fetching comment");
            }
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const editComment = async (id, data) => {
        try {
            const res = await updateComment(id, data);
            if (!res.error) {
                await fetchComments();
                return res.data.comment;
            } else {
                throw new Error(res.e?.message || "Error updating comment");
            }
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const removeComment = async (id) => {
        try {
            const res = await deleteComment(id);
            if (!res.error) {
                await fetchComments();
                return true;
            } else {
                throw new Error(res.e?.message || "Error deleting comment");
            }
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return {
        comments,
        loading,
        error,
        createComment,
        findComment,
        editComment,
        removeComment,
        refresh: fetchComments
    };
};