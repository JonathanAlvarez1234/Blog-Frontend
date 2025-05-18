import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    getComments as getCommentsRequest,
    saveComment as saveCommentRequest,
    searchComment as searchCommentRequest,
    updateComment as updateCommentRequest,
    deleteComment as deleteCommentRequest,
} from "../../services/api.jsx";

export const useComments = () => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getComments = async () => {
        setIsLoading(true);
        const res = await getCommentsRequest();
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error obteniendo comentarios");
        } else {
            setComments(res.data.comments); // <- El backend devuelve 'comments'
        }
        setIsLoading(false);
    };

    const createComment = async (data) => {
        const res = await saveCommentRequest(data);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error al guardar comentario");
        } else {
            toast.success("Comentario publicado");
            setComments((prev) => [...prev, res.data.comment]);
        }
    };

    const getCommentById = async (id) => {
        const res = await searchCommentRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error al buscar comentario");
        }
        return res.data?.comment;
    };

    const updateComment = async (id, data) => {
        const res = await updateCommentRequest(id, data);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error actualizando comentario");
        } else {
            toast.success("Comentario actualizado");
            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === id ? { ...comment, ...data } : comment
                )
            );
        }
    };

    const deleteComment = async (id) => {
        const res = await deleteCommentRequest(id);
        if (res.error) {
            toast.error(res.e?.response?.data?.message || "Error eliminando comentario");
        } else {
            toast.success("Comentario eliminado");
            setComments((prev) => prev.filter(comment => comment._id !== id));
        }
    };

    useEffect(() => {
        getComments();
    }, []);

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