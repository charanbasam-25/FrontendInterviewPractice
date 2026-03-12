import { useState, useEffect } from "react";

const api = "https://dummyjson.com/users?";

function formatData(keys, data) {
  return keys.reduce((acc, curr) => {
    if (curr in data) {
      acc[curr] = data[curr];
    }
    return acc;
  }, {});
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErros] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumer] = useState(1);
  const columns = ["firstName", "lastName", "age", "gender", "username"];
  const [searchData, setSearchedData] = useState([]);
  const [order, setOrder] = useState("asc");

  async function FetchUsers() {
    setIsLoading(true);
    try {
      const data = await fetch(
        `${api}limit=10&skip=${(pageNumber - 1) * 10}` // ✅ CHANGED (pagination fix)
      );
      const json = await data.json();
      setUsers(json.users);
      setNumPages(Math.ceil(json.total / 10));
    } catch (err) {
      setErros(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    FetchUsers();
  }, [pageNumber]);

  let formatedData = users?.map((eachObj) => {
    return formatData(columns, eachObj);
  });

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();

    const returnedData = formatedData.filter((eachdata) => {
      return Object.entries(eachdata).some(([key, value2]) => {
        return String(value2).toLowerCase().includes(value);
      });
    });

    setSearchedData(returnedData);
  }

  const displayData = searchData.length > 0 ? searchData : formatedData;

  // ✅ CHANGED (Added sorting logic)
  function handleSort(colName) {
    const sortedData = [...displayData].sort((a, b) => {
      if (a[colName] < b[colName]) return order === "asc" ? -1 : 1;
      if (a[colName] > b[colName]) return order === "asc" ? 1 : -1;
      return 0;
    });

    if (searchData.length > 0) {
      setSearchedData(sortedData);
    } else {
      setUsers(sortedData);
    }

    setOrder((prev) => (prev === "asc" ? "desc" : "asc")); // ✅ CHANGED
  }

  return (
    <div className="dashboard">
      <div className="search-bar">
        <input
          type="text"
          placeholder="search the filter"
          onChange={handleSearch}
        />
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((eachCol) => {
              return (
                <th
                  key={eachCol} // ✅ CHANGED (React key)
                  onClick={() => handleSort(eachCol)}
                >
                  {eachCol} {order === "asc" ? "↑" : "↓"} {/* ✅ CHANGED */}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {displayData.length > 0 &&
            displayData.map((eachData, index) => {
              return (
                <tr key={index}> {/* ✅ CHANGED */}
                  {columns.map((key) => {
                    return <td key={key}>{eachData[key]}</td>; // ✅ CHANGED
                  })}
                </tr>
              );
            })}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <button
                onClick={() =>
                  setPageNumer((prev) => Math.max(prev - 1, 1)) // ✅ CHANGED
                }
              >
                Prev
              </button>

              {Array.from({ length: numPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPageNumer(index + 1)} // ✅ CHANGED
                  className={pageNumber === index + 1 ? "active" : ""} // ✅ CHANGED
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setPageNumer((prev) => Math.min(prev + 1, numPages)) // ✅ CHANGED
                }
              >
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Dashboard;