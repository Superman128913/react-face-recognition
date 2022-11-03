import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveMemberAvatar } from "../../../actions/userActions";
import colors from "../../../config/colors";
import RegisterSteps from "../../RegisterSteps";
const AVATARS = [
  {
    id: 1,
    name: "faraz",
    displayName: "فراز",
  },
  {
    id: 2,
    name: "vida",
    displayName: "ویدا",
  },
];

function AddMemberAvatar({ history }) {
  const [avatar, setAvatar] = useState("faraz");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(saveMemberAvatar(avatar));
    history.push("/accounts/addMember/favorites");
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
      <Modal.Body style={{ backgroundColor: colors.primary, borderWidth: 0 }}>
        <RegisterSteps step1 step2 />
        <Row className="text-center justify-content-around">
          {AVATARS.map((a) => {
            const selected = a.name === avatar;
            return (
              <Col
                sm={3}
                key={a.id}
                className="d-flex flex-column align-items-center"
                onClick={() => setAvatar(a.name)}
              >
                <Image
                  src="/icon.png"
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 5,
                  }}
                />
                <p style={selected ? { color: colors.blue } : {}}>
                  {a.displayName}
                </p>
              </Col>
            );
          })}
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
          onClick={handleSubmit}
        >
          ادامه
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default AddMemberAvatar;
