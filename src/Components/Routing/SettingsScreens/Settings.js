import React from "react";
import { Row, Col, Modal, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import colors from "../../../config/colors";
import { server_url } from "../../../services/client";
function Settings(props) {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div>
      <Modal.Header
        style={{ backgroundColor: colors.primary, borderWidth: 0 }}
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
        <Row className="text-center">
          <Col>
            <Link to="/lang" className="text-decoration-none text-light">
              <Image
                src="/icon.png"
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 5,
                }}
              />
              <p>زبان</p>
            </Link>
          </Col>
          <Col>
            <Link to="/theme" className="text-decoration-none text-light">
              <Image
                src="/icon.png"
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 5,
                }}
              />
              <p>تنظیمات تم</p>
            </Link>
          </Col>
          <Col>
            <Link to="/accounts" className="text-decoration-none text-light">
              <Image
                src="/icon.png"
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 5,
                }}
              />
              <p>حساب ها</p>
            </Link>
          </Col>
        </Row>
      </Modal.Body>
    </div>
  );
}

export default Settings;
