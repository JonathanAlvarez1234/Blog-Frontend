import { Box, Input, Textarea, Button, VStack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [visitorName, setVisitorName] = useState('');
    const [content, setContent] = useState('');

    const fetchComments = async () => {
        const res = await findComment();
        if (!res.error) {
            const filtered = res.data.comments.filter(c => c.whichPost._id === postId);
            setComments(filtered);
        }
    };

    const handleSubmit = async () => {
        if (!visitorName || !content) return;
        const res = await createComment({ visitorName, content, whichPost: postId });
        if (!res.error) {
            setVisitorName('');
            setContent('');
            fetchComments();
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <Box mt="4">
            <VStack spacing="3" align="stretch">
                {comments.map((comment) => (
                    <Box key={comment._id} p="2" bg="gray.100" borderRadius="md">
                        <Text fontWeight="bold">{comment.visitorName}</Text>
                        <Text>{comment.content}</Text>
                        <Text fontSize="sm" color="gray.500">{new Date(comment.date).toLocaleString()}</Text>
                    </Box>
                ))}
                <Input
                    placeholder="Tu nombre"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                />
                <Textarea
                    placeholder="Escribe un comentario"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button onClick={handleSubmit} colorScheme="blue">Comentar</Button>
            </VStack>
        </Box>
    );
};

export default CommentSection;