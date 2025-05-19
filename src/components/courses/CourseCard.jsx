import { Box, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ courseName, buttonColor = '#9fd6d2', buttonText = 'Ver publicaciones' }) => {
  const navigate = useNavigate();

  return (
    <Box
      p="6"
      bg="#fffaf0"
      border="1px solid #d0ecea"
      borderRadius="xl"
      boxShadow="lg"
      transition="all 0.2s"
      _hover={{ transform: 'scale(1.03)', boxShadow: 'xl' }}
      w="100%"
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="semibold" color="#8b7a5e">
          {courseName}
        </Text>
        <Button
          bg={buttonColor}
          color="white"
          _hover={{ bg: '#8b7a5e' }}
          onClick={() => navigate(`/courses/${courseName}`)}
          px="6"
        >
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
};

export default CourseCard;