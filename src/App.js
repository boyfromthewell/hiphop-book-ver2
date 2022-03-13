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

  let [limit, setLimit] = useState(7);
  let [page, setPage] = useState(1);
  let offset = (page - 1) * limit;

  let alphaBtn = Array.from({ length: 26 }, (v, i) =>
    String.fromCharCode(i + 65)
  );
  alphaBtn.push("etc", "View All");
  let count = 0;
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
            alphaBtn.map((item, idx) => {
              return (
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={(e) => {
                    setAlphabet(e.target.value);
                    setPage(1);
                  }}
                  value={item}
                  key={idx}
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
                  count++;
                  console.log(count);
                  return <Title x={x} />;
                } else if (
                  Number.isInteger(Number(x.name.substring(0, 1))) &&
                  alphabet === "etc"
                ) {
                  count++;
                  console.log(count);
                  return <Title x={x} />;
                }
              })}
              {alphabet === "View All"
                ? mydata.slice(offset, offset + limit).map((x) => {
                    count++;
                    console.log(count);
                    return <Title x={x} />;
                  })
                : null}
              {alphabet === "View All" ? (
                <Pagination
                  total={mydata.length}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                />
              ) : null}
            </div>
          </div>
          {count === 0 && alphabet !== "" ? (
            <div className="none-data">해당하는 데이터가 없습니다 !</div>
          ) : null}
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
            <div className="search-result" key={item.id}>
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
function Pagination({ total, limit, page, setPage }) {
  let numPages = Math.ceil(total / limit);
  if (numPages === 0) {
    numPages = 1;
  }
  return (
    <div className="page-btn">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </div>
  );
}
export default App;
