import "./contact.scss"
import {Email} from "@mui/icons-material"
const Contact = () => {
    return(
        <div className="contact">
            <div className="background"></div>
            <div className="wrapper">
                <div className="left">
                    <div className="title">
                        Let's Talking About Your Proejct
                    </div>
                    <div className="info">
                        <div className="item">
                            <Email className="icon" />
                            MahdiHazratiMailBox@gmail.com
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="description">
                        if you thing i can help You
                        i am here to cantribute on you Proejct.
                        <b>Let's Explain Your Idea.</b>
                    </div>
                    <form>
                        <input type="text" name="user_name" placeholder="Your Name" />
                        <input type="text" name="user_subjet" placeholder="Subject" />
                        <input type="text" name="user_email" placeholder="Email" />
                        <textarea name="user_message" id="form-message"rows="5"></textarea>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact