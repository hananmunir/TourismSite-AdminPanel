import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./SignIn.css";
import { signIn } from "../../Actions/auth";

export default function Login() {
  const navigate = useNavigate();
  const error = useSelector((state) => state.Auth.error);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signIn(email, password));
  }

  return (
    <>
      <div className="login-text">Admin Login</div>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <span style={{ color: "red", fontSize: "1.1rem", margin: ".8rem 0" }}>
            {error}
          </span>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </FormGroup>

          <Button
            block="true"
            size="lg"
            type="submit"
            color="primary"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
