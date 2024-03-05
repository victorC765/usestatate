import { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function App(args) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch('./api/auth.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const data = await response.json();
      console.log('Respuesta de la API:', data);
      // Mostrar mensaje de éxito o error al usuario
    } catch (error) {
      console.error('Error al enviar datos:', error);
      // Mostrar mensaje de error al usuario
    }
  };
  return (
    <>
      <div>
        <Button color="danger" onClick={toggle}>
         aprietame
        </Button>
        <Modal
          isOpen={modal}
          onSubmit={handleSubmit}
          toggle={toggle}
          dark
          {...args}
        >
          <ModalHeader toggle={toggle}>incio de sesión</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                id=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                id=""
                onChange={handlePasswordChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"  type="sudmit" onClick={toggle}>
              aceptar
            </Button>{" "}
            <Button color="danger"onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default App;
