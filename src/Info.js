import React, { useState, memo } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Info(props) {
  let { id } = useParams();
  let findItem = props.mydata.find((item) => {
    return item.id == id;
  });
  console.log(findItem);
  let [input, setInput] = useState("");

  let comment = localStorage.getItem(id);
  comment = JSON.parse(comment);
  console.log(comment);

  let history = useHistory();

  return (
    <>
      <div className="info-main-box">
        <ReactPlayer
          className="player"
          url={findItem.video}
          controls
          playing={true}
          width="500px"
          height="400px"
        />
        <div className="artist-info">
          <img src={findItem.img} alt={findItem.name} />

          <div>
            <div className="title">
              <span className="name">
                {findItem.name} {"(" + findItem.kor_name + ")"}
              </span>
              <a target="_blank" href={findItem.instagram}>
                <FontAwesomeIcon icon={faInstagram} oncl />
              </a>
            </div>
            <p>{findItem.comment}</p>
          </div>
        </div>
        <Badge bg="primary" style={{ fontSize: "20px" }}>
          comment ({comment === null ? 0 : comment.length})
        </Badge>
        {comment === null
          ? null
          : comment.map((x) => {
              return (
                <div className="comment">
                  <span className="contents">{x.contents}</span>{" "}
                  <span className="date">{x.date}</span>
                </div>
              );
            })}
        <div className="comment-box">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            maxLength="30"
            placeholder="바른말 고운말^_^ (글자수 제한 30자)"
          />
          <button
            onClick={() => {
              let comment = localStorage.getItem(id);
              let today = new Date();
              if (input.length === 0) {
                alert("댓글 내용이 없습니다!");
                return false;
              }
              if (comment === null) {
                comment = [];
              } else {
                comment = JSON.parse(comment);
              }
              console.log(comment);
              comment.push({
                contents: input,
                date: today.toLocaleString(),
              });
              localStorage.setItem(id, JSON.stringify(comment));
              console.log(comment.length);
              setInput("");
            }}
          >
            등록
          </button>
        </div>
      </div>
      <button
        className="backBtn"
        onClick={() => {
          history.goBack();
        }}
      >
        ←
      </button>
    </>
  );
}
export default Info;
