import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";
import Home from "./Pages/home";
import Projects from "./Pages/Projects";


function App() {
  return (
    <HeroUIProvider>
      <Router>
        <Toaster richColors position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </HeroUIProvider>
  );
}

export default App;
