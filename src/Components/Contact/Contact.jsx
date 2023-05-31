import { useRef, useState } from "react"
import "./contact.scss"
import {Email} from "@mui/icons-material"
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef()
    const [done, setDone] = useState(false)
    function handleSubmitForm(event){
        event.preventDefault()
        emailjs.sendForm('service_zl4t2ls', 'template_doocqp8', formRef.current, 'aZU06nceXvU-wBFPc')
        .then((result) => {
            console.log(result.text);
            setDone(true)
        }, (error) => {
            console.log(error.text);
        });
        
    }
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
                    {done && (
                        <p className="response">Thank You , i'll back you soon</p>
                    )}

                    <form ref={formRef} onSubmit={handleSubmitForm}>
                        <input type="text" name="user_name" placeholder="Your Name" />
                        <input type="text" name="user_subject" placeholder="Subject" />
                        <input type="text" name="user_email" placeholder="Email" />
                        <textarea name="user_message" placeholder="Message"rows="5"></textarea>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact