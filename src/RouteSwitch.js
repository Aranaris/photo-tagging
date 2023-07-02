import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function RouteSwitch() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <nav>

            </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/game" />
                <Route path="/results" />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;