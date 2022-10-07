import { useEffect, useState } from "react";
import "./App.css";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(null);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [showData, setShowData] = useState(false);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setData(null);
    let url = "https://apis.ccbp.in/wiki-search?search=" + input;
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then((res) => setData(res));
    setLoaderStatus(!loaderStatus);
  }, [status]);

  const onClickButton = () => {
    setStatus(!status);
    setShowData(true);
  };

  var renderResults =
    data === null ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TailSpin height="80" width="80" radius="9" color="green" />
      </div>
    ) : (
      data.search_results.map((items) => (
        <li className="result-item">
          <h1 className="result-title ">{items.title}</h1>
          <a className="result-url" href={items.link}>
            {items.link}
          </a>
          <p className="link-description ">{items.description}</p>
        </li>
      ))
    );

  console.log(data);

  return (
    <div className="main-container">
      <div className="wiki-search-header text-center">
        <img
          alt="img"
          className="wiki-logo col-12"
          src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png"
        />
        <br />
        <input
          id="searchInput"
          placeholder="Type a keyword and press Enter to search"
          type="search"
          className="search-input col-10"
          onChange={onChangeInput}
          value={input}
        />
        <button
          type="button"
          className="btn button col-2"
          onClick={onClickButton}
        >
          Search
        </button>
      </div>
      <div className="d-none" id="spinner">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
      <div id="searchResults" className="search-results">
        {showData && renderResults}
      </div>
    </div>
  );
}

export default App;
