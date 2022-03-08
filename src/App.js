import "./App.css";
import "./Main.scss";
import { useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
import Info from "./Info";

function App() {
  let [mydata, setData] = useState([]);
  let [alphabet, setAlphabet] = useState("");
  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState([]);

  let alphaBtn = Array.from({ length: 26 }, (v, i) =>
    String.fromCharCode(i + 65)
  );
  alphaBtn.push("etc", "View All");

  useEffect(() => {
    axios
      .get("https://9dea6967-5687-42c4-90a7-ef1d969b53ff.mock.pstmn.io/list")
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch(() => {});
  }, []);

  mydata = mydata.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );
  console.log(mydata);

  const updateChange = (e) => {
    let data = e.target.value;
    let filterData = mydata.filter((i) =>
      i.name.toLowerCase().includes(data.toLowerCase())
    );
    if (data.length === 0) {
      filterData = [];
    }
    setSearch(filterData);
  };

  return (
    <div className="App">
      <div className="nav-bar">
        <Link to="/">HIPHOP BOOK</Link>
      </div>
      <Switch>
        <Route exact path="/">
          <SearchBar
            updateChange={updateChange}
            search={search}
            setSearch={setSearch}
          />
          {loading ? (
            <div className="spinner">
              <Spinner animation="border" variant="primary" />
              <p>Loading...</p>
            </div>
          ) : (
            alphaBtn.map((item) => {
              return (
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={(e) => {
                    setAlphabet(e.target.value);
                  }}
                  value={item}
                >
                  {item}
                </Button>
              );
            })
          )}

          {alphabet == "" ? <h1>초기 화면</h1> : null}

          <div className="container">
            <div className="main-box">
              {mydata.map((x) => {
                if (
                  x.name.substring(0, 1).toLowerCase() ===
                  alphabet.toLowerCase()
                ) {
                  return <Title x={x} />;
                } else if (
                  Number.isInteger(Number(x.name.substring(0, 1))) &&
                  alphabet === "etc"
                ) {
                  return <Title x={x} />;
                } else if (alphabet === "View All") {
                  return <Title x={x} />;
                }
              })}
            </div>
          </div>
        </Route>

        <Route path="/info/:id">
          <Info mydata={mydata} />
        </Route>
      </Switch>
    </div>
  );
}
function SearchBar({ updateChange, search, setSearch }) {
  return (
    <div className="search">
      <input
        className="seacrh-bar"
        style={{
          width: "100%",
          height: "40px",
          maxWidth: "800px",
          border: "1px solid white",
        }}
        placeholder="검색어를 입력하세요."
        onChange={(e) => updateChange(e)}
      ></input>
      {search.map((item) => {
        return (
          <>
            <div className="search-result">
              <Link to={"/info/" + item.id}>
                <p onClick={() => setSearch([])}>
                  {item.name} ({item.kor_name})
                </p>
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
}
function Title({ x }) {
  return (
    <div className="artist" key={x.id}>
      <img src={x.img} alt={x.name} />
      <Link to={"/info/" + x.id}>
        <p>
          {x.name} {"(" + x.kor_name + ")"}
        </p>
      </Link>
    </div>
  );
}
export default App;
