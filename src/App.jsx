import {
    Route,
    Router,
    Routes,
    unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom"
import "./App.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "react-toastify/dist/ReactToastify.css"
import HomePage from "./pages/HomePage"
import ChatDetails from "./components/ChatDetails"
import NewGroup from "./components/NewGroup"
import Singin from "./pages/Singin"
import { useEffect } from "react"
import { history } from "./config/history"

function App() {

    return (
        <Routes history={history}>
            {/* <Routes> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/chat-details" element={<ChatDetails />} />
            <Route path="/new-group" element={<NewGroup />} />
            <Route path="/signin" element={<Singin />} />
            {/* </Routes> */}
        </Routes>
    )
}

export default App
