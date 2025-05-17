import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/mainPage/HomePage.jsx";
import CoursePage from "./pages/mainPage/CoursePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/course" element={<CoursePage />}/>
        </Routes>
    );
};

export default AppRoutes;