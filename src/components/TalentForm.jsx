import "./TalentForm.css";
import React, {useState} from "react";

const TalentForm = () => {
    const [formData, setFormData] = useState({
        name:"",
        age:"",
        email:"",
        talent:"",
    });

const handleChange = (e) => {
    const{name, value} =e.target;
    setFormData({
        ...formData,
        [name]:value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.talent) {
      alert("Please select talent before submitting.");
      return;
    }

    try {
        const response = await fetch("https://angelesapi.azurewebsites.net/submit", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if(response.ok){
            const result = await response.json();
            alert("Form is submitted successfully");
            console.log("API Response:", result);
            console.log("Form submission was successful");

            //reset the form
            setFormData({
                name:"",
                age:"",
                email:"",
                talent:"select your talent"
            });
        } else {
            alert("failed to submit form. Please try again");
            console.error("API Error:", response.statusText);
        }
    } catch (error) {
        alert("An error occurred while submitting the form. Please try again");
        console.error("Error:", error);
    };
}

return(
    <div className = "form-container">
        <div className="form-card">
            <h1> Talent Form for PUPBC</h1>
            <p> Fill out the details below if youre interested</p>
        <form onSubmit = {handleSubmit}>

          {/* Name Input Field */}
            <div className = "form-field">
                <label htmlFor="name"> Name </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
              </div>

              {/*Age Input Field */}
              <div className="form-field">
                  <label htmlFor="age">Age</label>
                  <input
                      type="number"
                      id="age"
                      name="age"
                      placeholder="enter your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      />
              </div>
              {/*Email Input Field */} 
              <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      />
              </div>
              {/* Talent Input Field */}
              <div className="form-field">
                  <label htmlFor="talent">Talent</label>
                  <select
                  id="talent"
                  name="talent"
                  value={formData.talent}
                  onChange={handleChange}
                  required
                  >
                      <option value ="">
                          select your talent
                      </option>
                      <option value="Singing">Singing</option>
                      <option value="Dancing">Dancing</option>
                      <option value="Poetry">Poetry</option>
                  </select>
              </div>
              {/*Submit Button */}
              <button type="submit" className="Submit-btn">
                  Submit
              </button>
              </form>
              </div>
              </div>
);

};

export default TalentForm;