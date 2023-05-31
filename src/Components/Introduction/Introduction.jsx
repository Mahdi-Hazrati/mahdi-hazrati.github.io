import ProfilePicture from "../../Assets/images/PngItem_503557.png"
import { ArrowDownward } from "@mui/icons-material"
import "./introduction.scss"

const Introduction = () => {
    return (
        <div className="introduction">
            <div className="left">
                <div className="wrapper">
                    <h2 className="hello">Hello , My name is </h2>
                    <h1 className="full-name">Mahdi Hazrati</h1>
                    <div className="job-title">
                        <div className="title-wrapper">
                            <div className="title-item">Web-Developer</div>
                            <div className="title-item">Writer</div>
                            <div className="title-item">UI/UX-Designer</div>
                            <div className="title-item">Story-Teller</div>
                            <div className="title-item">Content-Creator</div>
                        </div>
                    </div>
                    <p className="job-description">
                        Collaborate with designers and developers to implement website designs and user interfaces
                    </p>
                </div>
                <div className="scroll-down">
                    <ArrowDownward className="icon" />
                </div>
            </div>
            <div className="right">
                <div className="background"></div>
                <img src={ProfilePicture} alt="mahdi hazrati profile" className="profile" />
            </div>
        </div>
    )
}

export default Introduction