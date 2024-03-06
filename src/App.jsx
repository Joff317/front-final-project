import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AudioVisualDetails from "./pages/audioVisualDetails/AudioVisualDetails";
import Nav from "./components/navbar/Nav";
import CreateAudiovisual from "./pages/CreateAudiovisual";
import NotFound from "./pages/notFound/NotFound";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-audiovisual" element={<CreateAudiovisual />} />
        <Route path="/details/:id" element={<AudioVisualDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
