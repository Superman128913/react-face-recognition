import React, { useState } from "react";
import { Image } from "react-bootstrap";
import colors from "../config/colors";
function ControlCenterDock() {
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
  return (
    <div className="p-2 d-flex flex-column justify-content-around align">
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-light">
          <small style={{ fontSize: 7 }}>
            <i className="fas fa-chevron-left"></i>
          </small>
        </div>
        <div className="d-flex flex-column justify-content-center text-light text-end align-items-center">
          <small style={{ fontSize: 10 }}>وای فای</small>
          <small className="text-muted" style={{ fontSize: 7 }}>
            MyIPhone
          </small>
        </div>

        <div
          style={{
            backgroundColor: colors.blue,
            width: 26,
            height: 26,
            borderRadius: 8,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <small>
            <i className="fas fa-wifi text-light"></i>
          </small>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center mt-2"
        onClick={() => setMute(!mute)}
      >
        <div className="text-light">
          <small style={{ fontSize: 7 }}>
            <i className="fas fa-chevron-left"></i>
          </small>
        </div>
        <div className="d-flex flex-column justify-content-center text-light text-end align-items-center">
          <small style={{ fontSize: 10 }}> صدا</small>
          {!mute ? (
            <small className="text-muted" style={{ fontSize: 9 }}>
              فعال
            </small>
          ) : (
            <small className="text-muted" style={{ fontSize: 9 }}>
              غیر فعال
            </small>
          )}
        </div>
        {!mute ? (
          <div
            style={{
              backgroundColor: colors.blue,
              width: 26,
              height: 26,
              borderRadius: 8,
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <small>
              <i className="fas fa-volume-up text-light"></i>
            </small>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: colors.lightGray,
              width: 26,
              height: 26,
              borderRadius: 8,
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <small>
              <i className="fas fa-volume-mute text-dark"></i>
            </small>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="text-light">
          <small style={{ fontSize: 7 }}>
            <i className="fas fa-chevron-left"></i>
          </small>
        </div>
        <div className="d-flex flex-column justify-content-center text-light text-end align-items-center">
          <small style={{ fontSize: 10 }}> دوربین </small>
          <small className="text-muted" style={{ fontSize: 9 }}>
            غیر فعال
          </small>
        </div>

        <div
          style={{
            backgroundColor: colors.lightGray,
            width: 26,
            height: 26,
            borderRadius: 8,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <small>
            <i className="fas fa-camera text-dark"></i>
          </small>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="text-light">
          <small style={{ fontSize: 7 }}>
            <i className="fas fa-chevron-left"></i>
          </small>
        </div>
        <div className="d-flex flex-column justify-content-center text-light text-end ">
          <small style={{ fontSize: 9 }}> نورحاشیه</small>
          <small className="text-muted" style={{ fontSize: 9 }}>
            زیاد
          </small>
        </div>

        <div
          style={{
            backgroundColor: colors.blue,
            width: 26,
            height: 26,
            borderRadius: 8,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <small>
            <Image src="/light.png" style={{ width: 18 }} />
          </small>
        </div>
      </div>
    </div>
  );
}

export default ControlCenterDock;
