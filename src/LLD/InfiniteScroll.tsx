import { useState, useEffect, useMemo, useCallback } from "react";
const api = "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1";

function throttel(fn, delay) {
  let lastCal = 0;

  return function (...args) {
    let now = Date.now();

    if (now - lastCal > delay) {
      lastCal = now;
      fn.apply(this, args);
    }
  };
}

function InfinteScroll() {
  const [memes, setMemes] = useState([]);
  const [pageNumber, setPageNumer] = useState(1);
  const [loading, setLoading] = useState(false);

  async function FetchMemes() {
    if (loading) return;
    try {
      setLoading(true);
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`,
      );
      const json = await data.json();
      console.log(json, "json-----");
      setMemes((prev) => [...prev, ...json]);
    } finally {
      setLoading(false);
    }
  }

  const handleScroll = useCallback(() => {
    let innerHeight = window.innerHeight;
    let scrollHeight = window.scrollY;
    let docHeight = document.body.scrollHeight;
    if (innerHeight + scrollHeight >= docHeight - 100) {
      setPageNumer((prev) => prev + 1);
    }
  }, []);

  const throttleScroll = useMemo(() => {
    return throttel(handleScroll, 300);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", throttleScroll);
    return () => {
      window.removeEventListener("scroll", throttleScroll);
    };
  }, [throttleScroll]);

  useEffect(() => {
    FetchMemes();
  }, [pageNumber]);

  return (
    <div className="Inifinte-scroll">
      Infinite Scroll
      <ul className="meme-grid">
        {memes &&
          memes.map((eachMeme, index) => {
            return (
              <li className="meme-box" key={eachMeme.id}>
                <p className="heading">{eachMeme?.title}</p>
                <p className="para">{eachMeme?.body}</p>
              </li>
            );
          })}
      </ul>
      {loading && (
        <div
          style={{
            color: "#fff",
          }}
        >
          <p>Loading more posts...</p>
        </div>
      )}
    </div>
  );
}

export default InfinteScroll;
