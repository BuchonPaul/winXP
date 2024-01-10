import { useEffect, useState } from "react";
import "./Internet.css";
import { io } from "socket.io-client";

const URL = "http://localhost:3000/";
const socket = io(URL, {
  transports: ["websocket"],
});

export default function NotePad() {
  const [prompt, setPrompt] = useState("Introduce me to astronomy");
  const [query, setQuery] = useState([]);
  const [response, setResponse] = useState("");
  const [responses, setResponses] = useState([]);
  const [wel, setWel] = useState(true);

  useEffect(() => {
    const getQuestion = ({ variations }) => {
      setQuery(variations);
    };
    const getResponses = ({ output, prompt, id }) => {
      let new_responses = responses;
      let index = new_responses.findIndex((element) => {
        return element.id == id;
      });
      setResponse(output);
      if (index == -1) {
        new_responses.push({ res: output, ques: prompt, id: id });
      } else {
        new_responses[index].res = output;
        new_responses[index].ques = prompt;
      }
      setResponses(new_responses);
    };

    socket.on("chat", getResponses);
    socket.on("queries", getQuestion);
    return () => {
      socket.off("queries", getQuestion);
      socket.off("chat", getResponses);
    };
  }, [responses]);

  useEffect(() => {
    query.forEach((element, index) => {
      socket.emit("chat", {
        prompt: element,
        id: index,
      });
    });
  }, [query]);

  useEffect(() => {}, [responses]);

  const onSubmit = () => {
    socket.emit("queries", {
      prompt: prompt,
      iteration: 4,
    });
    setWel(false);
  };

  return (
    <div className="IEContainer">
      <div className="welcomPage" style={{ display: !wel ? "none" : "flex" }}>
        <div className="googleWindow">
          <img src="google.jpg" />
          <div className="searchField">
            <input
              type="text"
              className="titInput"
              placeholder="Write your prompt…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="searchBut" onClick={onSubmit}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="searchPage" style={{ display: wel ? "none" : "flex" }}>
        <div className="searhHeader">
          <img src="google.jpg" onClick={() => setWel(true)} />
          <input
            type="text"
            placeholder="Write your prompt…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="searchBut" onClick={onSubmit}>
            Search
          </button>{" "}
        </div>
        <div className="searchContent">
          {responses.map((item) => {
            return (
              <div className="response" key={item.id}>
                <h4>{item.ques}</h4>
                <p>{item.res}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
