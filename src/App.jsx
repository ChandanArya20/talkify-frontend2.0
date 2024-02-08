import { Route, Routes } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import ChatDetails from "./components/ChatDetails";
import NewGroup from "./components/NewGroup";
import Singin from "./pages/Singin";

function App() {
    return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/chat-details" element={<ChatDetails />} />
			<Route path="/new-group" element={<NewGroup />} />
			<Route path="/signing" element={<Singin />} />
		</Routes>
    );
}

export default App;
