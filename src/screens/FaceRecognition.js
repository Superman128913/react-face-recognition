import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import colors from "../config/colors";
import FaceRecognitionWebcam from "../Components/FaceRecognitionWebcam";
import RegisterSteps from "../Components/RegisterSteps";
function FaceRecognition({ history }) {
  const [startCapture] = useState(false);
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
          <RegisterSteps step1 />
          <FaceRecognitionWebcam
            startCapture={startCapture}
            history={history}
          />
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            disabled
            style={{ backgroundColor: colors.blue }}
            className="px-5"
          >
            ادامه
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default FaceRecognition;
