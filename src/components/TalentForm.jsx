import "./TalentForm.css";
import React, { useState } from "react";

const MessageForm = () => {
    const [formData, setFormData] = useState({
        senderName: "",
        message: "",
        recipientName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.message || !formData.recipientName) {
            alert("Please complete all required fields before submitting.");
            return;
        }

        try {
            const response = await fetch("https://angelesapi.azurewebsites.net/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Message submitted successfully.");
                setFormData({
                    senderName: "",
                    message: "",
                    recipientName: "",
                });
            } else {
                alert("Failed to submit the message. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while submitting the message. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h1>Unsint a Message</h1>
                <p>Write your message and share it.</p>
                <form onSubmit={handleSubmit}>
                    {/* Sender Name Input Field */}
                    <div className="form-field">
                        <label htmlFor="senderName">Your Name</label>
                        <input
                            type="text"
                            id="senderName"
                            name="senderName"
                            placeholder="Type 'Anonymous' if not applicable"
                            value={formData.senderName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Message Input Field */}
                    <div className="form-field">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Write your unsent message here..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* Recipient Name Input Field */}
                    <div className="form-field">
                        <label htmlFor="recipientName">Recipient's Name</label>
                        <input
                            type="text"
                            id="recipientName"
                            name="recipientName"
                            placeholder="Enter the recipient's name, or leave blank"
                            value={formData.recipientName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;
