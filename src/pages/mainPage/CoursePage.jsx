import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../../components/courses/PostCard.jsx';
import axios from 'axios';
import { Heading, Box, Button } from '@chakra-ui/react';

const CoursePage = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/blogSystem/posts');
        const filtered = res.data.posts.filter(
          p => p.course && p.course.name === courseName && p._id
        );
        console.log("Posts recibidos:", filtered);
        setPosts(filtered);
      } catch (err) {
        console.error("Error al obtener publicaciones:", err);
      }
    };
    fetchPosts();
  }, [courseName]);

  return (
    <>
      <Box maxW="7xl" mx="auto" px={4} py={6}>
        <Heading mb="6" textAlign="center">
          Publicaciones de {courseName}
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
        >
          {posts.map((post) => {
            console.log("Renderizando post:", post);
            return <PostCard key={post._id} post={post} />;
          })}
        </Box>
      </Box>

      <Box px={4} py={6}>
        <Button className="back-btn" onClick={() => navigate("/")}>
          ← Volver al inicio
        </Button>
      </Box>
    </>
  );
};

export default CoursePage;