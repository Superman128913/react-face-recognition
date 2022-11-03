import React, { useState, useEffect } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { useDispatch, useSelector } from "react-redux";
import { getMusics } from "../actions/musicActions";
import "react-jinke-music-player/assets/index.css";

function MusicPlayerDock() {
  const [audioInstance, setAudioInstance] = useState(null);
  const [isPaly, setIsPlay] = useState();

  const { loading, musics, error } = useSelector((state) => state.allMusics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMusics());
  }, []);
  return (
    <div className="d-flex justify-content-around text-light w-75 mt-3">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ReactJkMusicPlayer
          audioLists={musics ? musics : []}
          showMediaSession
          getAudioInstance={(instance) => setAudioInstance(instance)}
          showDownload={false}
          showDestroy={false}
          defaultPosition={{ bottom: 16, right: "26%" }}
          restartCurrentOnPrev
          showLyric
          showThemeSwitch={false}
          onAudioPlay={() => setIsPlay(true)}
          onAudioPause={() => setIsPlay(false)}
          autoPlay={false}
          drag={false}
          className="rounded"
        />
      )}
      <div onClick={() => audioInstance.play()} className="indicators">
        <small style={{ fontSize: 10 }}>
          <i className="fas fa-list"></i>
        </small>
      </div>
      <div onClick={() => audioInstance.playPrev()} className="indicators">
        <small style={{ fontSize: 10 }}>
          <i className="fas fa-angle-double-left  "></i>
        </small>
      </div>
      {isPaly ? (
        <div onClick={() => audioInstance.pause()} className="indicators">
          <small style={{ fontSize: 10 }}>
            <i className="fas fa-pause "></i>
          </small>
        </div>
      ) : (
        <div onClick={() => audioInstance.play()} className="indicators">
          <small style={{ fontSize: 10 }}>
            <i className="fas fa-play "></i>
          </small>
        </div>
      )}
      <div onClick={() => audioInstance.playNext()} className="indicators">
        <small style={{ fontSize: 10 }}>
          <i className="fas fa-angle-double-right "></i>
        </small>
      </div>
      <div onClick={() => audioInstance.load()} className="indicators">
        <small style={{ fontSize: 10 }}>
          <i className="fas fa-sync-alt"></i>
        </small>
      </div>
    </div>
  );
}

export default MusicPlayerDock;
