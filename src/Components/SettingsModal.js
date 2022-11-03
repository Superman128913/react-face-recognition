import React from "react";
import { Modal, Button } from "react-bootstrap";
import colors from "../config/colors";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Settings from "./Routing/SettingsScreens/Settings";
import TurnOff from "./Routing/SettingsScreens/TurnOff";
import Accounts from "./Routing/SettingsScreens/Accounts";
import Language from "./Routing/SettingsScreens/Language";
import AddMember from "./Routing/SettingsScreens/AddMember";
import AddMemberFaceRecognition from "./Routing/SettingsScreens/AddMemberFaceRecognition";
import AddMemberAvatar from "./Routing/SettingsScreens/AddMemberAvatar";
import AddMemberFavorites from "./Routing/SettingsScreens/AddMemberFavorites";

function SettingsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-light"
      backdrop="static"
    >
      <Router>
        <Route path="/" component={Settings} exact />
        <Route path="/turnOff" component={TurnOff} />
        <Route path="/accounts" component={Accounts} exact />
        <Route path="/accounts/addMember" component={AddMember} exact />
        <Route
          path="/accounts/addMember/faceRecognition"
          component={AddMemberFaceRecognition}
          exact
        />
        <Route
          path="/accounts/addMember/avatar"
          component={AddMemberAvatar}
          exact
        />
        <Route
          path="/accounts/addMember/favorites"
          component={AddMemberFavorites}
          exact
        />
        <Route path="/lang" component={Language} />
      </Router>

      <Button
        onClick={props.onHide}
        className="px-5"
        style={{
          backgroundColor: colors.closeButton,
          borderWidth: 0,
          position: "absolute",
          bottom: -50,
          left: "50%",
          marginLeft: -65,
        }}
      >
        بستن
      </Button>
    </Modal>
  );
}

export default SettingsModal;
