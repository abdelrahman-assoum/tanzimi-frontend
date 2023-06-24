import React, { useState } from "react";
import contact from "../../Assets/Images/contact.svg";
import { TextField } from "@mui/material";
import styles from "./contact.module.css";
import Button from "../Button/Button";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      message: message,
    };

    if (email.length > 0 && name.length > 0 && message.length > 0) {
      try {
          await emailjs.send(
            "service_badzn89",
            "template_fq50791",
            {
              formData,
            },
            "75FwSreAQEAZUB28a"
          );
        toast.success("Your message has been sent!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ position: "relative" }} id="contact">
      <div className={styles.illustration}>
        <svg
          width="440"
          height="560"
          viewBox="0 0 440 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0C38.6028 3.56688 77.1153 7.13376 113.91 18.985C150.614 30.9513 185.601 51.0869 218.78 77.6659C251.958 104.36 283.509 137.267 296.618 182.486C309.727 227.705 304.574 285.005 318.677 325.852C332.69 366.698 366.049 390.861 389.464 427.22C412.879 463.464 426.439 511.675 440 560H0V0Z"
            fill="#0080FB"
          />
        </svg>
      </div>
      <div className={styles.contact}>
        <div className={styles.image}>
          <img src={contact} alt="contact" />
        </div>
        <div className={styles.contactForm}>
          <div className={styles.heading}>
            <h4>Get In Touch</h4>
            <span>
              Let's Connect and Take Your Productivity to the Next Level
            </span>
          </div>
          <form style={{ marginBottom: "2rem" }}>
            <TextField
              id="nameinput"
              label="Your Name"
              variant="outlined"
              required
              sx={{
                marginBottom: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="nameinput"
              type="email"
              label="Your Email"
              required
              variant="outlined"
              sx={{
                marginBottom: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="nameinput"
              label="Your Message"
              multiline
              rows={4}
              required
              variant="outlined"
              sx={{
                marginBottom: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className={styles.contactButton}>
              <Button title="Submit" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
