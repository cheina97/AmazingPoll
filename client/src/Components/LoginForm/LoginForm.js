import "./LoginForm.css";
import icon from "./icon.png";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { loginUser } from "../../Api/PostApi.js";
import ErrorAlert from "../ErrorAlert";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorDetected, setErrorDetected] = useState(false);
  const [logged, setLogged] = useState(false);

  const [mode, setMode] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      loginUser(mail, password)
        .then((user) => {
          props.setUserName(user.name);
          setLogged(true);
        })
        .catch((err) => {
          setErrorDetected(err);
        });
    }
    setValidated(true);
  };

  return (
    <>
      {logged && <Redirect exact to="/main" />}
      <div className="text-center main">
        <Form
          noValidate
          className="form-signin"
          validated={validated}
          onSubmit={handleSubmit}
        >
          <img className="mb-4" src={icon} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">
            {mode ? "Please sign in" : "I'm here for"}
          </h1>

          {mode ? (
            <>
              <Form.Group>
                <Form.Control
                  onChange={(x) => setmail(x.target.value)}
                  value={mail}
                  required
                  type="email"
                  placeholder="Email address"
                  id="email"
                />
                <Form.Control
                  onChange={(x) => setpassword(x.target.value)}
                  value={password}
                  required
                  type="password"
                  placeholder="Password"
                  id="password"
                />
                <Form.Control.Feedback type="invalid">
                  Insert your account mail address and the password
                </Form.Control.Feedback>
              </Form.Group>
              {errorDetected ? <ErrorAlert errors={errorDetected} /> : null}
              <Button size="lg" variant="success" block={true} type="submit">
                Sign in
              </Button>
              <div
                className="mt-4"
                style={{ cursor: "pointer" }}
                onClick={() => setMode("")}
              >
                Go back
              </div>
            </>
          ) : (
            <>
              <Link style={{ textDecoration: "none" }} to="/main">
                <Button
                  size="lg"
                  variant="success"
                  className="mb-2"
                  block={true}
                >
                  Vote a poll
                </Button>
              </Link>
              <Button
                onClick={() => setMode("create")}
                size="lg"
                variant="success"
                block={true}
                type="submit"
              >
                Create a poll
              </Button>
            </>
          )}

          <p className="mt-4 mb-3 text-muted">
            &copy; Francesco Cheinasso 2021
          </p>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
