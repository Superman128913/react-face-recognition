import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { Image } from "react-bootstrap";
import SettingsModal from "./SettingsModal";
import { useHistory } from "react-router-dom";
import WeatherDock from "./WeatherDock";
import MusicPlayerDock from "./MusicPlayerDock";
import ControlCenterDock from "./ControlCenterDock";
import FaceRecognition from "./FaceRecognition";
function Dock() {
  let history = useHistory();
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [faceRec, setFaceRec] = useState(false);
  const [mute, setMute] = useState(false);
  function muteMe(elem) {
    elem.muted = true;
  }
  function unMuteMe(elem) {
    elem.muted = false;
  }
  if (mute) {
    document.querySelectorAll("video , audio").forEach((elem) => muteMe(elem));
  } else {
    document
      .querySelectorAll("video , audio")
      .forEach((elem) => unMuteMe(elem));
  }
  const closeSettingsModal = () => {
    try {
      setShowSettingModal(false);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setFaceRec(true);
    }, 20 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  const showFaceRecModal = () => {
    setShutdown(false);
    setMute(false);
    setFaceRec(true);
  };
  const shutMirrorDown = () => {
    setShutdown(true);
    setMute(true);
  };
  return (
    <>
      {shutdown && (
        <div
          className="shutdown text-light"
          onClick={() => showFaceRecModal()}
        ></div>
      )}
      <div className="Dock" style={{ backgroundColor: colors.primary }}>
        <div style={{ position: "relative" }}>
          <div
            className="ControlCenter"
            style={{
              backgroundColor: colors.gray,
              position: "absolute",
              left: 10,
              top: 10,
            }}
          >
            <ControlCenterDock />
          </div>
          <div
            className="weatherDetailsContainer d-flex justify-content-center align-items-center "
            style={{
              backgroundColor: colors.gray,
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            <WeatherDock />
          </div>
          <FaceRecognition show={faceRec} onHide={() => setFaceRec(false)} />
          <div
            sm={6}
            className="DockButton d-flex flex-column align-items-center justify-content-center text-light"
            onClick={() => shutMirrorDown()}
            style={{ position: "absolute", top: 94, left: 139 }}
          >
            <Image src="/power.png" fluid width={21} />
            <small className="mt-1" style={{ fontSize: 9 }}>
              خاموش کردن
            </small>
          </div>
          <div
            sm={6}
            onClick={() => setShowSettingModal(true)}
            className="DockButton text-light d-flex align-items-center justify-content-center"
            style={{ position: "absolute", top: 94, right: 10 }}
          >
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <Image src="/setting.png" fluid width={25} />
              <small className="mt-1" style={{ fontSize: 9 }}>
                {" "}
                تنظیمات
              </small>
            </div>
          </div>
          <SettingsModal show={showSettingModal} onHide={closeSettingsModal} />
          <div
            style={{ position: "absolute", top: 178, right: 10 }}
            className="MusicContainer text-light text-center"
          >
            <small style={{ fontSize: 13 }}>
              مرغ سحر ناله سر کن، داغ مرا تازه تر کن ز آه شرر بار این قفس را؛ بر
              شکن و زیر و زبر کن
            </small>
          </div>
          <div
            style={{ position: "absolute", top: 243, right: 10 }}
            className="MusicContainer text-light text-center"
          >
            <MusicPlayerDock />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dock;
