import { Box, Input, Textarea, Button, VStack, Text, HStack } from '@chakra-ui/react';
import { useComments } from '../../shared/hooks/useComments.jsx';
import React, { useState } from 'react';


const CommentSection = ({ postId }) => {
    const {
        comments,
        isLoading,
        createComment,
        editComment,
        removeComment,
    } = useComments(postId);

    const [visitorName, setVisitorName] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);


    const handleSubmit = async () => {
        if (!visitorName.trim() || !content.trim()) return;

        try {
            if (editingId) {
                await editComment(editingId, { visitorName, content });
                setEditingId(null);
            } else {
                await createComment({ visitorName, content, postId });
            }
            setVisitorName('');
            setContent('');
        } catch (error) {
            console.error("Error al enviar el comentario", error);
        }
    };

    const handleEdit = (comment) => {
        setVisitorName(comment.visitorName);
        setContent(comment.content);
        setEditingId(comment._id);
    };

    const handleCancel = () => {
        setVisitorName('');
        setContent('');
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        try {
            await removeComment(id);
        } catch (error) {
            console.error("Error al eliminar comentario", error);
        }
    };

    if (isLoading) {
        return <Text>Cargando comentarios...</Text>;
    }

    return (
        <VStack spacing="4" align="stretch">
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <Box key={comment._id} bg="white" p="3" borderRadius="md" shadow="sm">
                        <Text fontWeight="bold">{comment.visitorName}</Text>
                        <Text mt="1">{comment.content}</Text>
                        <Text fontSize="xs" color="gray.500" mt="1">
                            {new Date(comment.date).toLocaleString()}
                        </Text>
                        <HStack mt="2" spacing="2">
                            <Button size="sm" onClick={() => handleEdit(comment)} className="comment-btn-yellow">
                                Editar
                            </Button>
                            <Button size="sm" onClick={() => handleDelete(comment._id)} className="comment-btn-red">
                                Eliminar
                            </Button>
                        </HStack>
                    </Box>
                ))
            ) : (
                <Text>No hay comentarios aún.</Text>
            )}

            <Box mt="4">
                <Input
                    placeholder="Tu nombre"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    mb="2"
                />
                <Textarea
                    placeholder="Escribe un comentario"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    mb="2"
                />
                <HStack>
                    <Button onClick={handleSubmit} className="comment-btn">
                        {editingId ? 'Actualizar' : 'Comentar'}
                    </Button>
                    {editingId && (
                        <Button onClick={handleCancel} className="comment-btn-cancel">
                            Cancelar
                        </Button>
                    )}
                </HStack>
            </Box>
        </VStack>
    );
};

export default CommentSection;