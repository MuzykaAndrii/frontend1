import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Terms from "./terms/Terms";
import Authority from "./terms/Authority";
import Use from "./terms/Use";
import Condition from "./Condition";

export default function AppComponent() {
    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/terms" element={<Condition />}>
                        <Route index element={<Terms />} />
                        <Route path="use" element={<Use />} />
                        <Route path="authority" element={<Authority />} />
                    </Route>

                </Routes>
            </div>
        </BrowserRouter>
    );
}
