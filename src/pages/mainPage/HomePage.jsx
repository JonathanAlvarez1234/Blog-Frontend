import { SimpleGrid, Heading } from '@chakra-ui/react';
import CourseCard from '../../components/courses/CourseCard.jsx';

const HomePage = () => {
  const courses = ['Tecnologia III', 'Taller III', 'Practica Supervisada'];

  return (
    <>
      <Heading mb="6">Bienvenido a mi Blog</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {courses.map(course => (
          <CourseCard key={course} courseName={course} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default HomePage;