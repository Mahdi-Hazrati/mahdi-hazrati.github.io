import "./project.scss"
import projectImage from "../../Assets/images/screencapture.png"
const Project = ()=>{
    return(
        <div className="project">
            <div className="tab">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <a href="https://mahdi-hazrati.github.io/" target="_blank" rel="noreferrer">
                <img src={projectImage} alt="project-thumbnail" className="thumbnails"/>
            </a>
        </div>
    )
}
export default Project