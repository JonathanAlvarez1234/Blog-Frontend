import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import axios from 'axios';
import { Heading } from '@chakra-ui/react';

const CoursePage = () => {
  const { courseName } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/blogSystem/posts')
      .then(res => {
        const filtered = res.data.posts.filter(p => p.course.name === courseName);
        setPosts(filtered);
      });
  }, [courseName]);

  return (
    <>
      <Heading mb="6">Publicaciones de {courseName}</Heading>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default CoursePage;