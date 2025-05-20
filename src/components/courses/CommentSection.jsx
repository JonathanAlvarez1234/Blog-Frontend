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
                    <Box key={comment._id} bg="#fdfaf6" p="4" borderRadius="md" shadow="md" border="1px solid #e0e0e0">
                        <Text fontWeight="semibold" fontSize="md" color="#8b7a5e">
                            {comment.visitorName}
                        </Text>
                        <Text mt="1" color="gray.700">
                            {comment.content}
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt="1">
                            {new Date(comment.date).toLocaleString()}
                        </Text>
                        <HStack mt="2" spacing="2">
                            <Button size="sm" bg="#f2c94c" color="white" _hover={{ bg: "#d4a72c" }} onClick={() => handleEdit(comment)}>
                                Editar
                            </Button>
                            <Button size="sm" bg="#e57373" color="white" _hover={{ bg: "#c62828" }} onClick={() => handleDelete(comment._id)}>
                                Eliminar
                            </Button>
                        </HStack>
                    </Box>
                ))
            ) : (
                <Text>No hay comentarios aún.</Text>
            )}

            <Box mt="4" bg="white" p="4" borderRadius="md" shadow="sm">
                <Input
                    placeholder="Tu nombre"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    mb="2"
                    bg="#ffefd3"
                />
                <Textarea
                    placeholder="Escribe un comentario"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    mb="2"
                    bg="#ffefd3"
                />
                <HStack>
                    <Button bg="#9fd6d2" color="white" _hover={{ bg: "#8b7a5e" }} onClick={handleSubmit}>
                        {editingId ? "Actualizar" : "Comentar"}
                    </Button>
                    {editingId && (
                        <Button bg="#e0e0e0" color="black" _hover={{ bg: "#bdbdbd" }} onClick={handleCancel}>
                            Cancelar
                        </Button>
                    )}
                </HStack>
            </Box>
        </VStack>
    );
};

export default CommentSection;