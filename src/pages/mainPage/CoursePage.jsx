import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../../components/courses/PostCard.jsx';
import axios from 'axios';
import { Heading } from '@chakra-ui/react';

const CoursePage = () => {
  const { courseName } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/blogSystem/posts');
        const filtered = res.data.posts.filter(p => p.course && p.course.name === courseName);
        console.log("Posts recibidos:", filtered); // <-- Verifica esto
        setPosts(filtered);
      } catch (err) {
        console.error("Error al obtener publicaciones:", err);
      }
    };
    fetchPosts();
  }, [courseName]);

  return (
    <>
      <Heading mb="6">Publicaciones de {courseName}</Heading>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default CoursePage;