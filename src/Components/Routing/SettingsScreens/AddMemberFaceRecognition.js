import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFullFaceDescription, loadModels } from "../../../api/face";
import colors from "../../../config/colors";
import Webcam from "react-webcam";
import RegisterSteps from "../../RegisterSteps";
import { saveMemberFace } from "../../../actions/userActions";
const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

function AddMemberFaceRecognition(props) {
  const [detections, setDetections] = useState();
  const [descriptors, setDescriptors] = useState([]);
  const [facingMode, setFacingMode] = useState("user");
  const dispatch = useDispatch();

  const { memberFace, success, memberInfo } = useSelector(
    (state) => state.memberRegister
  );

  const webcam = React.useRef(null);

  useEffect(() => {
    async function fetchData() {
      console.log("loading");
      await loadModels();
      console.log("ready");
    }
    if (memberFace && success) {
      props.history.push("/accounts/addMember/avatar");
    }
    fetchData();
    setInputDevice();

    const interval = setInterval(() => {
      capture();
    }, 9000);
    return () => clearInterval(interval);
  }, [success]);

  const setInputDevice = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
      return;
    }
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        let inputDevice = devices.filter(
          (device) => device.kind === "videoinput"
        );
        if (inputDevice.length < 2) {
          setFacingMode("user");
        } else {
          setFacingMode({ exact: "environment" });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const capture = async () => {
    if (!!webcam.current) {
      await getFullFaceDescription(
        webcam.current.getScreenshot(),
        inputSize
      ).then((fullDesc) => {
        if (fullDesc) {
          try {
            setDescriptors([fullDesc.map((fd) => fd.descriptor)]);
            setDetections(fullDesc.map((fd) => fd.detection));
            dispatch(
              saveMemberFace({
                name: memberInfo.username,
                descriptors: fullDesc.map((fd) => fd.descriptor),
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  let drawBox = null;
  if (detections) {
    drawBox = detections.map((detection, i) => {
      let _H = detection.box.height;
      let _W = detection.box.width;
      let _X = detection.box._x;
      let _Y = detection.box._y;
      return (
        <div key={i}>
          <div
            style={{
              position: "absolute",
              border: "solid",
              borderColor: colors.blue,
              height: _H,
              width: _W,
              transform: `translate(${_X}px,${_Y}px)`,
            }}
          ></div>
        </div>
      );
    });
  }
  let videoConstraints = null;

  if (!!facingMode) {
    videoConstraints = {
      width: WIDTH,
      height: HEIGHT,
      facingMode: facingMode,
    };
  }
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
      <Modal.Body
        style={{ backgroundColor: colors.primary, borderWidth: 0 }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <RegisterSteps step1 />
        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
          }}
        >
          <div style={{ position: "relative", width: WIDTH }}>
            {videoConstraints ? (
              <>
                <div style={{ position: "absolute" }}>
                  <Webcam
                    audio={false}
                    width={WIDTH}
                    height={HEIGHT}
                    ref={webcam}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </div>
              </>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
      </Modal.Body>
    </div>
  );
}

export default AddMemberFaceRecognition;
