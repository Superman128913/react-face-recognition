import React from "react";
import { Row, Col, Modal, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import colors from "../../../config/colors";
import { useSelector } from "react-redux";
import { server_url } from "../../../services/client";

function Accounts() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div>
      <Modal.Header
        style={{ backgroundColor: colors.lightGray, borderWidth: 0 }}
        className="d-flex justify-content-end align-items-center"
      >
        <p className="text-end mt-3">
          {userInfo.profile.name} {userInfo.profile.lastName}
        </p>

        <Image
          src={`${server_url}${userInfo.profile.profile_pic}`}
          style={{
            width: 50,
            height: 50,
            backgroundColor: colors.lightGray,
            borderRadius: 25,
            marginLeft: 5,
          }}
        />
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: colors.primary, borderWidth: 0 }}>
        <Row className="text-center row-cols-4">
          {userInfo.members.map((member) => (
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <Image
                src={`${server_url}${member.profile_pic}`}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.lightGray,
                  borderRadius: 25,
                  marginLeft: 5,
                }}
              />
              <small>{member.name}</small>
            </Col>
          ))}
          <Col>
            <Link
              to="/accounts/addMember"
              className="text-decoration-none text-light"
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.lightGray,
                  borderRadius: 25,
                  margin: "auto",
                }}
                className="d-flex align-items-center justify-content-center"
              >
                <i class="fas fa-plus fs-4"></i>
              </div>
              <p>افزودن </p>
            </Link>
          </Col>
        </Row>
      </Modal.Body>
    </div>
  );
}

export default Accounts;
