import React, { useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import colors from "../../../config/colors";
import RegisterSteps from "../../RegisterSteps";
import { useDispatch } from "react-redux";
import { saveMemberInformation } from "../../../actions/userActions";
import cities from "../../../ir.json";
function AddMember({ history }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birth_day_date, setBirth_day_date] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveMemberInformation({
        name,
        username: phoneNumber,
        lastName,
        phoneNumber: phoneNumber,
        gender,
        birth_day_date,
        city,
      })
    );
    history.push("/accounts/addMember/faceRecognition");
  };
  return (
    <div>
      <Modal.Header
        style={{
          backgroundColor: colors.lightGray,
          borderWidth: 0,
          padding: 10,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <p>افزودن</p>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body
          style={{ backgroundColor: colors.primary, borderWidth: 0 }}
          className="text-end"
        >
          <RegisterSteps />
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
            <Col>
              <Form.Group>
                <Form.Label> شهر</Form.Label>
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
            <Col>
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
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: colors.primary, borderWidth: 0 }}
          className="d-flex justify-content-start"
        >
          <Button
            type="submit"
            style={{ backgroundColor: colors.blue }}
            className="px-5"
          >
            ادامه
          </Button>
        </Modal.Footer>
      </Form>
    </div>
  );
}

export default AddMember;
