
import { Container } from "@mui/material";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
