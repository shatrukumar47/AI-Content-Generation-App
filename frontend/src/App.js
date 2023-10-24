import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import MainRoute from "./Routes/MainRoute";

function App() {
  return (
    <div className="App" style={{minHeight : "100vh"}}>
      <Navbar />
      <MainRoute />
      <Footer />
    </div>
  );
}

export default App;
