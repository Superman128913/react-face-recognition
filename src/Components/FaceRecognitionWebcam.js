import React, { useState, useEffect } from "react";
import { loadModels, getFullFaceDescription, createMatcher } from "../api/face";
import Webcam from "react-webcam";
import colors from "../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { saveFaceRecognitionToLocalStorage } from "../actions/userActions";

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

function FaceRecognitionWebcam(props) {
  // const [fullDesc, setFullDesc] = useState(null);
  // const [match, setMatch] = useState(null);
  // const [faceMatcher, setFaceMatcher] = useState(null);

  const [detections, setDetections] = useState();
  const [descriptors, setDescriptors] = useState([]);
  const [facingMode, setFacingMode] = useState("user");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const { face, success } = useSelector((state) => state.userFace);
  const webcam = React.useRef(null);
  console.log(success);
  useEffect(() => {
    async function fetchData() {
      console.log("loading");
      await loadModels();
      // setFaceMatcher(await createMatcher(jsonFile));
      console.log("ready");
    }
    if (success && face.descriptors[0]) {
      props.history.push("/avatar");
    }
    fetchData();
    setInputDevice();

    const interval = setInterval(() => {
      capture();
    }, 5000);
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
              saveFaceRecognitionToLocalStorage({
                key: {
                  name: userInfo.username,
                  descriptors: fullDesc.map((fd) => fd.descriptor),
                },
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      });

      // if (descriptors && faceMatcher) {
      //   let matched = await descriptors.map((descriptor) =>
      //     descriptor.map((d) => faceMatcher.findBestMatch(d))
      //   );
      //   setMatch(matched);
      // }
    }
  };
  // You were here!

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
            {/* {match && match[i] ? (
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
            ) : null} */}
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
    <div
      className="Camera"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
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
    </div>
  );
}

export default FaceRecognitionWebcam;
