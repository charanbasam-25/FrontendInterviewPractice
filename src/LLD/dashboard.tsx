import { useState, useEffect } from "react";

const api = "https://dummyjson.com/users?";
function formatData(keys, data) {
  console.log(keys, data, "data----");
  return keys.reduce((acc, curr, index) => {
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
  async function FetchUsers() {
    setIsLoading(true);
    try {
      const data = await fetch(`${api}limit=${10}&skip=${pageNumber * 10}`);
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

  console.log(users, "user---");
  let formatedData = users?.map((eachObj, index) => {
    return formatData(columns, eachObj);
  });
  function handleSearch(e) {
    const returnedData = formatedData.filter((eachdata, index) => {
      return Object.entries(eachdata).some(([key, value], index) => {
        if (
          String(value).toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return true;
        }
      });
    });
    setSearchedData(returnedData);
  }

  const displayData = searchData.length > 0 ? searchData : formatedData;

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
            {columns.map((eachCol, index) => {
              return <th>{eachCol}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 &&
            displayData?.map((eachData, index) => {
              return (
                <tr>
                  {columns.map((key, index) => {
                    return <td>{eachData[key]}</td>;
                  })}
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <button
                onClick={() => setPageNumer((prev) => Math.max(prev - 1, 0))}
              >
                Prev
              </button>

              {Array.from({ length: numPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPageNumer(index)}
                  className={pageNumber === index ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setPageNumer((prev) => Math.min(prev + 1, numPages - 1))
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
