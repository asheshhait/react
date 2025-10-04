import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "12c192a4-b940-4956-badf-d1c64b34720f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully ✅");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult("❌ " + data.message);
    }
  };

  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Expedita velit labore libero blanditiis excepturi 
          perferendis et fugit?
        </p>
        <ul>
          <li><img src={mail_icon} alt="" /> abcd@gmail.com</li>
          <li><img src={phone_icon} alt="" /> 1234567789</li>
          <li><img src={location_icon} alt="" /> Kolkata, 700001</li>
        </ul>
      </div>

      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name='name' placeholder='Enter your name' required />

          <label>Phone Number</label>
          <input type="tel" name='phone' placeholder='Enter your mobile number' required />

          <label>Write your message here</label>
          <textarea name="message" cols="30" rows="10" required></textarea>

          <button type='submit' className='btn dark-btn'>
            Submit Now <img src={white_arrow} alt="" />
          </button>
        </form>

        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact;
