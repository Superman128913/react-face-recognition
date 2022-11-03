import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import RegisterSteps from "../Components/RegisterSteps";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import cities from "../ir.json";

import colors from "../config/colors";
function RegisterScreen({ history, location }) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birth_day_date, setBirth_day_date] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.userRegister
  );
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (success) {
      history.push("/faceRecognition");
    }
  }, [dispatch, userInfo, redirect, history]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register(
        phoneNumber,
        phoneNumber,
        name,
        lastName,
        city,
        phoneNumber,
        gender,
        birth_day_date
      )
    );
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
        <Card.Header className="text-center text-light">ثبت نام</Card.Header>
        <Form onSubmit={handleSubmit}>
          <Card.Body className="text-end text-light">
            <RegisterSteps />
            {/* <Row className="mb-3">
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
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border rounded text-end"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                    }}
                    placeholder="وارد کنید"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row> */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>نام خانوادگی</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  <Form.Label>نام</Form.Label>
                  <Form.Control
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>شماره تلفن</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                  <Form.Label>جنسیت</Form.Label>
                  <Form.Control
                    required
                    value={gender}
                    as="select"
                    onChange={(e) => setGender(e.target.value)}
                    type="text"
                    className="border rounded text-end"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                    }}
                    placeholder="وارد کنید"
                  >
                    <option value="">...کلیک کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>شهر</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    as="select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border rounded text-end"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                    }}
                    placeholder="وارد کنید"
                  >
                    <option value="">...کلیک کنید</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.city}>
                        {c.city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>سال تولد</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={birth_day_date}
                    onChange={(e) => setBirth_day_date(e.target.value)}
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
          <Card.Footer className="text-center">
            <Button
              type="submit"
              style={{ backgroundColor: colors.blue }}
              className="px-5"
            >
              ثبت نام و ادامه
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

export default RegisterScreen;
