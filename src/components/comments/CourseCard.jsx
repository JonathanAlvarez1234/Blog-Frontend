import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ courseName }) => {
  const navigate = useNavigate();

  return (
    <Box p="4" shadow="md" borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" mb="2">{courseName}</Text>
      <Button colorScheme="blue" onClick={() => navigate(`/courses/${courseName}`)}>Ver publicaciones</Button>
    </Box>
  );
};

export default CourseCard;