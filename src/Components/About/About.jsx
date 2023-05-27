import "./about.scss"
import pic from "../../Assets/images/mahdi-hazrati-profile-picture.jpg"
const About = ()=>{
    return (
        <div className="about">
            <div className="left">
                <div className="card background"></div>
                <div className="card">
                    <img src={pic} alt="about me" className="picture"/>
                </div>
            </div>
            <div className="right">
                <h1 className="title">About me</h1>
                <p className="sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, perferendis!</p>
                <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident laudantium alias, repudiandae dolore nam, reiciendis delectus eum recusandae eos, voluptatem quos nostrum adipisci sit atque quod quibusdam consequatur. Facilis maiores magni ab error quaerat exercitationem pariatur fuga ad modi placeat tenetur adipisci, nemo, quis vel aliquam ut incidunt aliquid nisi.
                </p>
                <div className="contact-me">
                    <a href="#contact-form">contact me</a>
                </div>
            </div>
        </div>
    )
}

export default About