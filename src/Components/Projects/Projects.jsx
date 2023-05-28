import Project from "../Project/Project"
import "./projects.scss"

const Projects = ()=>{
    return(
        <div className="projects">
            <div className="information">
                <h1 className="title">
                    Create something new
                </h1>
                <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In quae deleniti odio similique? Culpa aliquam distinctio est praesentium, numquam ab excepturi, nulla quod, assumenda eveniet mollitia? Quaerat iste iure nobis, non ad assumenda quae dolor odio sunt libero sit unde accusamus ex aut, officia quod voluptas ipsum quibusdam rerum consectetur.
                </p>
            </div>
            <div className="list">
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
            </div>
        </div>
    )
}
export default Projects