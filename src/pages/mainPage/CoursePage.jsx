import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../../components/courses/PostCard.jsx";
import { Text } from '@chakra-ui/react';
import axios from "axios";
import {
  Heading,
  Box,
  Button,
  Container,
  SimpleGrid,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const CoursePage = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/blogSystem/posts");
        const filtered = res.data.posts.filter(
          (p) => p.course && p.course.name === courseName && p._id
        );
        setPosts(filtered);
      } catch (err) {
        console.error("Error al obtener publicaciones:", err);
      }
    };
    fetchPosts();
  }, [courseName]);

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bgImage="url('/images/BackG.png')" // asegurate que esté en /public/images
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
      w="100vw" // 👈 Agrega esto para cubrir ancho completo
      mt="70px"
      py={10}
    >
      <Box
        maxW="7xl"
        mx="auto"
        px={4}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          w="100%"
          bg="rgba(255, 255, 255, 0.9)"
          borderRadius="xl"
          p={6}
          boxShadow="xl"
        >
          <Heading fontSize="4xl" color="blue.700" mt="70px" mb={4} textAlign="center">
            📘 Publicaciones del curso
          </Heading>
          <Text fontSize="xl" color="gray.700" fontWeight="medium" mb={8} textAlign="center">
            {courseName}
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mt={8}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </SimpleGrid>

        <Flex justify="center" mt={10}>
          <Button colorScheme="blue" variant="solid" onClick={() => navigate("/")}>
            ← Volver al inicio
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CoursePage;