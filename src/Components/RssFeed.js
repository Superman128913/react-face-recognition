import React, { useEffect, useRef, useState } from "react";
import colors from "../config/colors";
import axios from "axios";
import { Row, Col, Image, Button } from "react-bootstrap";
function RssFeed() {
  const API_KEY = "yf8rcgsgrsvxzttwhg3aslpibbg2iaay5tpssbdn";
  // const RSS_URL = "https://feeds.bbci.co.uk/news/world/rss.xml";
  const RSS_URL = "https://www.irinn.ir/fa/rss/allnews";
  const [show, setShow] = useState(false);
  const [feeds, setFeeds] = useState();

  const target = useRef(null);

  useEffect(() => {
    getFeeds();
  }, []);
  const getFeeds = async () => {
    try {
      const { data } = await axios.get(
        `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}`
      );
      setFeeds(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="RssFeed"
      style={{ backgroundColor: colors.primary }}
      ref={target}
    >
      {feeds ? (
        <div onClick={() => setShow(!show)}>
          {feeds.slice(0, 1).map((feed, index) => (
            <>
              <Row
                key={feed.title}
                className="text-light justify-content-center text-end p-3 row-cols-2"
              >
                <Col sm={9}>
                  <small style={{ width: "100%", fontSize: 12 }}>
                    {feed.title}
                  </small>
                </Col>
                <Col sm={3}>
                  {feed.thumbnail ? (
                    <Image
                      src={feed.thumbnail}
                      fluid
                      rounded
                      width={50}
                      height={50}
                    />
                  ) : (
                    <i className="fas fa-image fs-1"></i>
                  )}
                </Col>
              </Row>
              <Row key={index} className="text-light text-end row-cols-1">
                <Col style={{ padding: 0 }}>
                  <div className="px-2">
                    <p className="pe-2" style={{ fontSize: 12 }}>
                      {feed.description}
                    </p>
                  </div>
                </Col>
                {!show ? (
                  <Col className="text-start ms-1 mb-2">
                    <Button
                      style={{ backgroundColor: colors.blue }}
                      onClick={() => setShow(true)}
                      size="sm"
                    >
                      ادامه مطلب
                    </Button>
                  </Col>
                ) : null}
                {show ? (
                  <Col style={{ padding: 0 }}>
                    <p className="text-light pe-3" style={{ fontSize: 12 }}>
                      {feed.content}
                    </p>
                  </Col>
                ) : null}
              </Row>
              <Row className="text-center text-light ">
                <Col>
                  {show ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                </Col>
              </Row>
            </>
          ))}
        </div>
      ) : (
        <div>Nodata</div>
      )}
    </div>
  );
}

export default RssFeed;
