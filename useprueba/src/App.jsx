import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";

function App(props) {
  const { className } = props;
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setModal(!modal);
    // Clear form fields when closing the modal
    setEmail("");
    setPassword("");
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update state based on changed input field
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const API_URL = "./api/auth";
  const METHOD = "POST";

  const submitData = async (email, password) => {
    try {
      const response = await axios({
        method: METHOD,
        url: API_URL,
        data: {
          email,
          password,
        },
      });
      // Manejar la respuesta exitosa aquí
      console.log("Datos enviados correctamente:", response);
    } catch (error) {
      // Manejar errores de la API aquí
      console.error("Error al enviar datos:", error);
    }
  };
  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    submitData(email, password);
    toggle();
    // Add any additional logic for handling the form submission here, if needed
    toggle(); // Close the modal after handling the submit
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Login
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange} // Link input change to function
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange} // Link input change to function
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
