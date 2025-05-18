import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/blogSystem/',
    timeout: 5000
});

export const saveComment = async (data) => {
    try {
        return await apiClient.post('/comments', data);
    } catch (e) {
        return { 
            error: true, 
            e 
        };
    }
};

export const getComments = async () => {
    try {
        return await apiClient.get('/comments');
    } catch (e) {
        return { 
            error: true, 
            e 
        };
    }
};

export const searchComment = async (commentId) => {
    try {
        return await apiClient.get(`/comments/find/${commentId}`);
    } catch (e) {
        return { 
            error: true, 
            e 
        };
    }
};

export const updateComment = async (commentId, data) => {
    try {
        return await apiClient.put(`/comments/${commentId}`, data);
    } catch (e) {
        return { 
            error: true, 
            e 
        };
    }
};

export const deleteComment = async (commentId) => {
    try {
        return await apiClient.delete(`/comments/${commentId}`);
    } catch (e) {
        return { 
            error: true, 
            e 
        };
    }
};