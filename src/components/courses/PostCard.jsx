import { Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import CommentSection from './CommentSection.jsx';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <Box className="post-card">
            <Text className="post-title">{post.title}</Text>
            <Text className="post-description">{post.description}</Text>
            <Text className="post-date">{new Date(post.date).toLocaleDateString()}</Text>
            <Button
                className="post-toggle-btn"
                onClick={() => setShowComments(!showComments)}
            >
                {showComments ? 'Ocultar Comentarios' : 'Ver Comentarios'}
            </Button>

            {showComments && (
                <Box mt="4">
                    <CommentSection postId={post._id} />
                </Box>
            )}
        </Box>
    );
};

export default PostCard;