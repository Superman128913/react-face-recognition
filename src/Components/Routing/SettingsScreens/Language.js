import React, { useState } from "react";
import { Row, Col, Modal, Image } from "react-bootstrap";
import colors from "../../../config/colors";

const LANGUAGES = [
  {
    id: "1",
    lang: "farsi",
    displayName: "فارسی",
  },
];

function Language() {
  const [selectedLang, setSelectedLang] = useState("farsi");
  return (
    <div>
      <Modal.Header
        style={{ backgroundColor: colors.lightGray, borderWidth: 0 }}
      >
        <p className="w-100 text-center">زبان</p>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: colors.primary, borderWidth: 0 }}>
        <Row className="text-center row-cols-4 justify-content-center">
          {LANGUAGES.map((lang) => {
            const selected = selectedLang === lang.lang;

            return (
              <Col onClick={() => setSelectedLang(lang.lang)}>
                <Image
                  src="/icon.png"
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 5,
                  }}
                />
                <p style={selected ? { color: colors.blue } : {}}>
                  {lang.displayName}
                </p>
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
    </div>
  );
}

export default Language;
