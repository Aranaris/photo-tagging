import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./components/Button";
import Home from "./components/Home";
import Tagging from "./components/Tagging";
import Results from "./components/Results"
import logo from "./assets/WLogo_Final.png";

function RouteSwitch() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <nav>
                <img id="logo" src={logo} alt="logo" />
                <Button as={Link} to="" text="Home"></Button>
                <Button as={Link} to="/tagging" text="Tagging"></Button>
                <Button as={Link} to="/results" text="Results"></Button>
            </nav>
            <Routes>
                <Route path="" element={<Home />}/>
                <Route path="/tagging" element={<Tagging />}/>
                <Route path="/results" element={<Results />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;