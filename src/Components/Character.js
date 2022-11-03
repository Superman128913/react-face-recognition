import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../actions/characterActions";
import { server_url } from "../services/client";

function Character() {
  const [character, setCharacter] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [video, setVideo] = useState();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { characters, loading, error } = useSelector(
    (state) => state.charactersData
  );
  const clock = new Date().getHours();
  const dispatch = useDispatch();
  const userCharacter = userInfo ? userInfo.profile.character : null;

  const getData = (now) => {
    try {
      dispatch(getCharacters());
      if (!loading) {
        takeVideo(now);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const takeVideo = (now) => {
    try {
      setCharacter(
        characters
          ? characters.filter(
              ({ characterName }) => characterName === userCharacter
            )
          : []
      );
      setAllVideos(
        character.length > 0
          ? character[0].conditions.filter(({ name, city }) => {
              if (name && city) {
                return (
                  name === userInfo.profile.name &&
                  city === userInfo.profile.city
                );
              } else if (name || city) {
                return (
                  name === userInfo.profile.name ||
                  city === userInfo.profile.city
                );
              }
            })
          : []
      );
      setVideo(
        allVideos.length > 0
          ? allVideos.find(({ time }) => new Date().getHours(time) === now)
          : null
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      getData(clock);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Character">
      {loading ? (
        <div className="text-light">loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ReactPlayer
          playing={true}
          // url="./test.mp4"
          url={video ? `${server_url}${video.cFile}` : null}
          width={300}
          height={350}
          muted={false}
        />
      )}
      {/* <video width="149" height="210" autoPlay controls>
        <source src={video} type="video/mp4" />
      </video> */}
    </div>
  );
}

export default Character;
