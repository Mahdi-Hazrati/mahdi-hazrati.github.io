import "./project.scss"

const Project = ({thumbnails, link})=>{
    return(
        <div className="project">
            <div className="tab">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <a href={link} target="_blank" rel="noreferrer">
                <img src={thumbnails} alt="project-thumbnail" className="thumbnails"/>
            </a>
        </div>
    )
}
export default Project