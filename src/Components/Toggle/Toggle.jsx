import "./toggle.scss"
import {
    DarkModeOutlined as DarkMode,
    LightModeOutlined as LightMode
} from "@mui/icons-material"


const Toggle = () =>{
    return (
        <div className="toggle">
            <DarkMode className="dark-mode icon" />
            <LightMode className="light-mode icon" />
            <div className="button"></div>
        </div>
    )
}

export default Toggle