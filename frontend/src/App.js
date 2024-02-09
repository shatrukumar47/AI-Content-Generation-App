import { useDisclosure } from "@chakra-ui/react";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import MainRoute from "./Routes/MainRoute";
import DisplayInfromation from "../src/Components/DisplayInformation"
import { useEffect } from "react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);


  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Navbar />
      <MainRoute />
      <Footer />
      <DisplayInfromation isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default App;
