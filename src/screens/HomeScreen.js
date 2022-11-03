import React, { useRef } from "react";
import Character from "../Components/Character";
import Dock from "../Components/Dock";
import RssFeed from "../Components/RssFeed";

function HomeScreen() {
  const target = useRef(null);
  return (
    <div className="HomeScreen" ref={target}>
      <Character />
      <RssFeed />
      <Dock />
    </div>
  );
}

export default HomeScreen;
