import { useState } from "react"
import HeaderComponent from "./common/components/Header"


export default function AppComponent() {
    let [isAuthenticated, setAuth] = useState(false);

    return <>
        <HeaderComponent isAuthenticated={isAuthenticated} />
        <div className='container'></div>
    </>
};