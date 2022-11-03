import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import colors from "../config/colors";
import Webcam from "react-webcam";
import { loadModels, getFullFaceDescription, createMatcher } from "../api/face";
import { useSelector } from "react-redux";
const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

function FaceRecognition(props) {
  const [match, setMatch] = useState(null);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [detections, setDetections] = useState();
  const [descriptors, setDescriptors] = useState([]);
  const [facingMode, setFacingMode] = useState("user");

  const { faces } = useSelector((state) => state.userFace);

  const webcam = React.useRef(null);
  useEffect(() => {
    async function fetchData() {
      console.log("loading");
      await loadModels();
      setFaceMatcher(await createMatcher(faces ? { faces } : null));
      console.log("ready");
    }

    fetchData();
    setInputDevice();

    const interval = setInterval(() => {
      capture();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          setDescriptors([fullDesc.map((fd) => fd.descriptor)]);
          setDetections(fullDesc.map((fd) => fd.detection));
        }
      });

      if (descriptors && faceMatcher) {
        let matched = await descriptors.map((descriptor) =>
          descriptor.map((d) => faceMatcher.findBestMatch(d))
        );
        setMatch(matched);
        return props.onHide();
      }
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
          >
            {match && match[i] ? (
              <p
                style={{
                  backgroundColor: colors.blue,
                  border: "solid",
                  borderColor: colors.blue,
                  width: _W,
                  marginTop: 0,
                  color: "#fff",
                  transform: `translate(-3px,${_H}px)`,
                }}
              >
                {match[i]._label}
              </p>
            ) : null}
          </div>
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
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-light"
      >
        <Modal.Header
          style={{
            backgroundColor: colors.lightGray,
            borderWidth: 0,
            padding: 10,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <p>تشخیص چهره</p>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: colors.primary, borderWidth: 0 }}
          className="d-flex justify-content-center align-items-center"
        >
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
      </Modal>
    </div>
  );
}

export default FaceRecognition;
