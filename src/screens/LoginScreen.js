import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import colors from "../config/colors";
function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100vh",
      }}
      className="d-flex align-items-center"
    >
      <Card className="w-75 m-auto" style={{ backgroundColor: colors.primary }}>
        <Card.Header className="text-center text-light">
          ورود به حساب کاربری
        </Card.Header>
        <Form onSubmit={handleSubmit}>
          <Card.Body className="text-end text-light">
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>رمز عبور</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded text-end"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                    }}
                    placeholder="وارد کنید"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>نام کاربری</Form.Label>
                  <Form.Control
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="border rounded text-end"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                    }}
                    placeholder="وارد کنید"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-center d-flex">
            <Button
              variant="outline-light mx-3 px-3"
              onClick={() => history.push("/register")}
            >
              کاربر جدید؟ ثبت نام کنید
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: colors.blue }}
              className="px-5"
            >
              ورود
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

export default LoginScreen;
