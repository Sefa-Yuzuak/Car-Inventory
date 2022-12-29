import React from "react";
import { Button, Container, Form } from "react-bootstrap";

function Profil() {

    const changeHandler = () => {
        console.log('s');
    }
    const checkUser = () => {
        console.log('s');
    }

  return (
    <>
      <Container className="col-lg-3 col-md-6 col-sm-6 bg-opacity-25 rounded-2 mt-2 centered border rounded-3 shadow-lg">
        <Form onSubmit={checkUser}>
          <Container>
            <h3>
              <i className="bi bi-person-square"></i> Şifre Değişikliği
            </h3>
          </Container>
          <hr></hr>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Eski Şifrenizi Girin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Eski Şifrenizi Girin"
              name="password"
              onChange={changeHandler}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Yeni Şifrenizi Girin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni Şifrenizi Girin"
              name="password"
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Yeni Şifrenizi Tekrar Girin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni Şifrenizi Tekrar Girin"
              name="password"
              onChange={changeHandler}
              required
            />
          </Form.Group>
          <Container className="d-grid gap-2 mt-4 login-button">
            <Button type="submit">Şifremi Güncelle</Button>
          </Container>
          
        </Form>
      </Container>
      <Container className="p-5">
      <span></span>
    </Container>
    </>
  );
}

export default Profil;
