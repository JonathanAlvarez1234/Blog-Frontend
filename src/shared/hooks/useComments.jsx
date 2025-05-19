import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    getComments as getCommentsRequest,
    saveComment as saveCommentRequest,
    getCommentsByPost as getCommentsByPostRequest,
    searchComment as searchCommentRequest,
    updateComment as updateCommentRequest,
    deleteComment as deleteCommentRequest,
} from "../../services/api.jsx";

export const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getComments = async () => {
        if (!postId) return;

        setIsLoading(true);
        try {
            const res = await getCommentsByPostRequest(postId);
            setComments(res.data.comments);
        } catch (err) {
            toast.error("Error getting comment");
            setComments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const createComment = async (data) => {
        const res = await saveCommentRequest(data);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error saving comment");
        } else {
            toast.success("Comment posted");
            await getComments();
        }
    };

    const getCommentById = async (id) => {
        const res = await searchCommentRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error searching for comment");
        }
        return res.data?.comment;
    };

    const updateComment = async (id, data) => {
        const res = await updateCommentRequest(id, data);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error updating comment");
        } else {
            toast.success("Updated comment");
            await getComments();
        }
    };

    const deleteComment = async (id) => {
        const res = await deleteCommentRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error deleting comment");
        } else {
            toast.success("Comment deleted");
            await getComments();
        }
    };

    useEffect(() => {
        if (postId) {
            getComments();
        }
    }, [postId]);

    return {
        comments,
        isLoading,
        getComments,
        createComment,
        getCommentById,
        editComment: updateComment,
        removeComment: deleteComment,
        refresh: getComments
    };
};