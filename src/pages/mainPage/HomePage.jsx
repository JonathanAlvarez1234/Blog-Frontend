import { SimpleGrid, Heading } from '@chakra-ui/react';
import CourseCard from '../components/CourseCard';

const HomePage = () => {
  const courses = ['Informática', 'Electrónica', 'Diseño Web'];

  return (
    <>
      <Heading mb="6">Bienvenido al Blog Educativo</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {courses.map(course => (
          <CourseCard key={course} courseName={course} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default HomePage;