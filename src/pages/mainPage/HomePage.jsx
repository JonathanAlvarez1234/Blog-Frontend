import { Box, Heading, Flex } from "@chakra-ui/react";
import CourseCard from "../../components/courses/CourseCard.jsx";

const HomePage = () => {
  const courses = [
    {
      name: "Tecnologia III",
      color: "#9fd6d2",
    },
    {
      name: "Taller III",
      color: "#f2c94c",
    },
    {
      name: "Practica Supervisada",
      color: "#e57373",
    },
  ];

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      bg="#fffee4"
      px={4}
      py={10}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mb={8} fontSize="3xl" color="#8b7a5e" textAlign="center">
        BloG
      </Heading>

      {courses.map((course, index) => (
        <Flex
          key={course.name}
          justifyContent={index % 2 === 0 ? "flex-end" : "flex-start"}
          mb={8}
          w="100%"
          maxW="600px"
        >
          <CourseCard
            courseName={course.name}
            buttonColor={course.color}
            buttonText="Ver publicaciones"
          />
        </Flex>
      ))}
    </Box>
  );
};

export default HomePage;