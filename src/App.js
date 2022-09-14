import "./App.css";
import React, { useState, useEffect } from "react";
const quoteSrc =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setTheQuote] = useState(
    "Your time is limited, so don’t waste it living someone else’s life."
  );
  const [author, setTheAuthor] = useState("Steve Jobs");
  const [randomNumber, setTheRandomNumber] = useState(0);
  const [quoteArray, setQuoteArray] = useState(null);

  const fetchDB = async (source) => {
    const fetching = await fetch(source);
    const prsdJson = await fetching.json();
    setQuoteArray(prsdJson.quotes);
    console.log(prsdJson);
  };

  useEffect(() => {
    fetchDB(quoteSrc);
  }, [quoteSrc]);

  const pickRandomQuote = () => {
    setTheRandomNumber(Math.floor(quoteArray.length * Math.random()));
    setTheQuote(quoteArray[randomNumber].quote);
    setTheAuthor(quoteArray[randomNumber].author);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
          <div id="text-block">
            <p id="text">"{quote}"</p>
          </div>
          <div id="author-block">
            <p id="author">-{author}</p>
          </div>
          <button id="new-quote" onClick={() => pickRandomQuote()}>
            Have a new quote
          </button>
          <a
            id="tweet-quote"
            target="_blank"
            href={encodeURI(
              `http://www.twitter.com/intent/tweet?text=${quote} -${author}`
            )}
          >
            Tweet this one?
          </a>
        </div>
      </header>
    </div>
  );
}
export default App;
