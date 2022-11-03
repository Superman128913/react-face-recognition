import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import colors from "../config/colors";
import RegisterSteps from "../Components/RegisterSteps";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileData,
  updateUserInterests,
} from "../actions/userActions";
const FAVORITES = [
  {
    id: "1",
    name: "Scientific",
    title: "علمی",
  },
  {
    id: "2",
    name: "love",
    title: "احساسی",
  },
  {
    id: "3",
    name: "religion",
    title: "مذهبی",
  },
  {
    id: "4",
    name: "clothe",
    title: "مد و پوشاک",
  },
  {
    id: "5",
    name: "business",
    title: "کسب و کار",
  },
  {
    id: "6",
    name: "lifeStyle",
    title: "روش زندگی",
  },
];
function FavoriteScreen({ history }) {
  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.userUpdateInterests);

  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);
  const handleOnPress = (item) => {
    const extractedName = item.name;
    for (let i = 0; i <= interests.length; i++) {
      if (extractedName === interests[i]) {
        setInterests(interests.filter((item) => item !== extractedName));
        break;
      } else {
        setInterests([...interests, extractedName]);
      }
    }
  };

  const handleSubmit = () => {
    dispatch(
      updateUserInterests({
        name: interests,
      })
    );
    dispatch(getUserProfileData());
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
          <RegisterSteps step1 step2 step3 />
          <Row className="text-center ">
            {FAVORITES.map((a) => {
              const selected = interests.find(
                (interest) => interest === a.name
              );
              return (
                <Col
                  sm={3}
                  key={a.id}
                  className="d-flex flex-column align-items-center"
                  onClick={() => handleOnPress(a)}
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
                    {a.title}
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
            پایان
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default FavoriteScreen;
