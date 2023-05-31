import { useContext } from "react"
import "./toggle.scss"
import {
    DarkModeOutlined as DarkMode,
    LightModeOutlined as LightMode
} from "@mui/icons-material"
import { ThemeContext } from "../../Context/ThemeContext"


const Toggle = () =>{
    const theme = useContext(ThemeContext)
    const darkmode = theme.state.darkMode
    const handleClick = ()=>{
        theme.dispatch({type:"TOGGLE"})
    }
    return (
        <div className="toggle" onClick={handleClick}>
            <DarkMode className="dark-mode icon" />
            <LightMode className="light-mode icon" />
            <div className={darkmode ? "button dark":"button light"}></div>
        </div>
    )
}

export default Toggle