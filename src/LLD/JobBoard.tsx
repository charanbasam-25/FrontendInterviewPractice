import { useState, useEffect } from "react";

function EachJob({ detials }) {
  const { title, time, by } = detials;
  return (
    <div
      className="eachjob"
      style={{
        border: "1px solid #fafafa",
        margin: "10px",
        borderRadius: "6px",
        padding: "20px",
      }}
    >
      <p>{title}</p>
      <p>
        {by}
        <span style={{ paddingLeft: "50px" }}>{time}</span>
      </p>
    </div>
  );
}
function JobBoard() {
  const [itemIds, setItemIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  let [prodDet, setProdDet] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    function fetchData() {
      fetch(`https://hacker-news.firebaseio.com/v0/jobstories.json`)
        .then((res) => res.json())
        .then((data) => setItemIds(data));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function ProductList() {
      setIsLoading(true);
      let items = itemIds.slice(pageNumber * 6, pageNumber * 6 + 6);
      let promises = items.map((eachId, index) => {
        return fetch(
          `https://hacker-news.firebaseio.com/v0/item/${eachId}.json`,
        ).then((res) => res.json());
      });
      const productDetails = await Promise.all(promises);
      setIsLoading(false);
      setProdDet((prev) => [...prev, ...productDetails]);
    }
    if (itemIds.length > 0) {
      ProductList();
    }
  }, [itemIds, pageNumber]);

  if (isLoading) {
    return <div>is loading...</div>;
  }
  return (
    <div className="job-board-container">
      <div className="board">
        {prodDet.map((eachProd, index) => {
          return <EachJob detials={eachProd} />;
        })}
      </div>
      <button
        disabled={6 * pageNumber >= itemIds.length}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        loadMore
      </button>
    </div>
  );
}

export default JobBoard;
