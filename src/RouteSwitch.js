import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./components/Button";
import Home from "./components/Home";
import Game from "./components/Game";
import Results from "./components/Results";

function RouteSwitch() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <nav>
                <Button as={Link} to="" text="Home"></Button>
                <Button as={Link} to="/game" text="Game"></Button>
                <Button as={Link} to="/results" text="Results"></Button>
            </nav>
            <Routes>
                <Route path="" element={<Home />}/>
                <Route path="/game" element={<Game />}/>
                <Route path="/results" element={<Results />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;