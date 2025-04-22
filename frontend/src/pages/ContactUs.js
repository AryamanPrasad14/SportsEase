import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Paper,
  } from "@mui/material";
  import { useState } from "react";
  
  const ContactUsPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can replace this with an API call
      console.log("Form Submitted:", formData);
      alert("Thank you for contacting us!");
      setFormData({ name: "", email: "", message: "" });
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            We'd love to hear from you. Fill out the form below and we'll get back
            to you as soon as possible.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Message"
              name="message"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default ContactUsPage;
  