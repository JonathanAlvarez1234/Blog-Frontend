import { Box, Text, Button /*Collapse*/ } from '@chakra-ui/react';
import { useState } from 'react';
import CommentSection from './CommentSection.jsx';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <Box p="4" shadow="md" borderWidth="1px" borderRadius="lg" mb="4">
            <Text fontSize="xl" fontWeight="bold">{post.title}</Text>
            <Text>{post.description}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(post.date).toLocaleDateString()}</Text>
            <Button mt="2" onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Ocultar Comentarios' : 'Ver Comentarios'}
            </Button>
            {showComments && (
                <CommentSection postId={post._id} />
            )}
        </Box>
    );
};

export default PostCard;