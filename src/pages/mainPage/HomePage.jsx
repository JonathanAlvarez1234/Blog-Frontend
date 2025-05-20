import { Box, Heading, Flex, Image, Select } from "@chakra-ui/react";
import CourseCard from "../../components/courses/CourseCard.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    {
      name: "Tecnologia III",
      color: "#9fd6d2",
      image: "/images/Tecno.png",
    },
    {
      name: "Taller III",
      color: "#f2c94c",
      image: "/images/Taller.png",
    },
    {
      name: "Practica Supervisada",
      color: "#e57373",
      image: "/images/PracTicaS.png",
    },
  ];

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/courses/${value}`);
    }
  };

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      mt="70px"
      bgImage="url('/images/BackG.png')"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      px={4}
      py={10}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      
      <Select
        placeholder="Filtrar publicaciones por curso"
        mb={6}
        maxW="300px"
        bg="white"
        onChange={handleSelectChange}
      >
        {courses.map((course) => (
          <option key={course.name} value={course.name}>
            {course.name}
          </option>
        ))}
      </Select>

      <Heading mb={8} fontSize="3xl" color="#8b7a5e" textAlign="center">
        BloG
      </Heading>

      {courses.map((course, index) => (
        <Flex
          key={course.name}
          justifyContent="center"
          alignItems="center"
          flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
          mb={8}
          w="100%"
          maxW="700px"
          gap={6}
        >
          <Image
            src={course.image}
            alt={course.name}
            height="140px"
            width="140px"
            objectFit="cover"
            borderRadius="md"
            boxShadow="md"
          />
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