import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import colors from "../config/colors";
import RegisterSteps from "../Components/RegisterSteps";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../actions/userActions";

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

function AvatarScreen({ history }) {
  const [avatar, setAvatar] = useState("faraz");

  const dispatch = useDispatch();
  const { loading, error, userInfo, success } = useSelector(
    (state) => state.userUpdate
  );

  useEffect(() => {
    if (success) {
      history.push("/favorites");
    }
  }, [success]);

  const handleSubmit = () => {
    dispatch(updateUserDetails(avatar));
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
        <Card.Body className="text-end text-light">
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
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            style={{ backgroundColor: colors.blue }}
            className="px-5"
            onClick={handleSubmit}
          >
            ادامه
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default AvatarScreen;
