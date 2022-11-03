import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Image, Button } from "react-bootstrap";
import colors from "../../../config/colors";
import RegisterSteps from "../../RegisterSteps";
import { useDispatch, useSelector } from "react-redux";
import { createMember } from "../../../actions/userActions";
import { SAVE_MEMBER_RESET } from "../../../constants/userConstants";
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
function AddMemberFavorites({ history }) {
  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();
  const { memberInfo, memberAvatar } = useSelector(
    (state) => state.memberRegister
  );
  console.log(memberInfo);
  const { loading, success } = useSelector((state) => state.createMember);
  useEffect(() => {
    if (success) {
      history.push("/");
      dispatch({
        type: SAVE_MEMBER_RESET,
      });
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
      createMember({
        interestsName: interests,
        username: memberInfo.username,
        name: memberInfo.name,
        lastName: memberInfo.lastName,
        gender: memberInfo.gender,
        birth_day_date: memberInfo.birth_day_date,
        city: memberInfo.city,
        avatar: memberAvatar,
      })
    );
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
        {loading && <div>loading...</div>}
        <RegisterSteps step1 step2 step3 />
        <Row className="text-center ">
          {FAVORITES.map((a) => {
            const selected = interests.find((interest) => interest === a.name);
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
                <p style={selected ? { color: colors.blue } : {}}>{a.title}</p>
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
          پایان
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default AddMemberFavorites;
