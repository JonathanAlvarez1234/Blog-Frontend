import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ courseName }) => {
    const navigate = useNavigate();

    return (
        <Box className="course-card">
            <Text className="course-card-title">{courseName}</Text>
            <Button onClick={() => navigate(`/courses/${courseName}`)}>
                Ver publicaciones
            </Button>
        </Box>
    );
};

export default CourseCard;