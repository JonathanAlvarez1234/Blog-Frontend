import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <Box
            p={6}
            bgGradient="linear(to-r, #fdfcfb, #e2d1c3)"
            borderRadius="xl"
            boxShadow="md"
            mt="70px"
            transition="0.3s"
            _hover={{ boxShadow: "2xl", transform: "translateY(-5px)" }}
        >
            <VStack align="start" spacing={3}>
                <Text fontSize="2xl" fontWeight="bold" color="#8b7a5e">
                    {post.title}
                </Text>
                <Text color="gray.700" noOfLines={3}>
                    {post.description}
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {new Date(post.date).toLocaleDateString()}
                </Text>
                <Button
                    bg="#9fd6d2"
                    color="white"
                    _hover={{ bg: "#8b7a5e" }}
                    onClick={() => setShowComments(!showComments)}
                >
                    {showComments ? "Ocultar Comentarios" : "Ver Comentarios"}
                </Button>
            </VStack>

            {showComments && (
                <Box mt={4}>
                    <CommentSection postId={post._id} />
                </Box>
            )}
        </Box>
    );
};

export default PostCard;