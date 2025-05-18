import {
    Box, Input, Textarea, Button, VStack, Text, HStack
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {useComments} from '../../shared/hooks/useComments.jsx';

const CommentSection = ({ postId }) => {
    const {
        comments, createComment, updateComment, deleteComment
    } = useComments();

    const [visitorName, setVisitorName] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    const filteredComments = comments.filter(comment =>
        comment.whichPost === postId || comment.whichPost?._id === postId
    );

    const handleSubmit = async () => {
        if (!visitorName.trim() || !content.trim()) return;

        if (editingId) {
            await updateComment(editingId, { visitorName, content });
            setEditingId(null);
        } else {
            await createComment({ visitorName, content, whichPost: postId });
        }

        setVisitorName('');
        setContent('');
        refresh();
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

    return (
        <VStack spacing="4" align="stretch">
            {filteredComments.map(comment => (
                <Box key={comment._id} bg="white" p="3" borderRadius="md" shadow="sm">
                    <Text fontWeight="bold">{comment.visitorName}</Text>
                    <Text mt="1">{comment.content}</Text>
                    <Text fontSize="xs" color="gray.500" mt="1">
                        {new Date(comment.date).toLocaleString()}
                    </Text>
                    <HStack mt="2" spacing="2">
                        <Button size="sm" onClick={() => handleEdit(comment)} colorScheme="yellow">
                            Editar
                        </Button>
                        <Button size="sm" onClick={() => deleteComment(comment._id)} colorScheme="red">
                            Eliminar
                        </Button>
                    </HStack>
                </Box>
            ))}

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
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        {editingId ? 'Actualizar' : 'Comentar'}
                    </Button>
                    {editingId && (
                        <Button onClick={handleCancel} colorScheme="gray">
                            Cancelar
                        </Button>
                    )}
                </HStack>
            </Box>
        </VStack>
    );
};

export default CommentSection;