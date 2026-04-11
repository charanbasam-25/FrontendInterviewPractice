import { useState, useEffect, useRef, useMemo } from "react";
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 79900,
    rating: 4.7,
    category: "Electronics",
    stock: 12,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 69999,
    rating: 4.5,
    category: "Electronics",
    stock: 8,
  },
  {
    id: 3,
    name: "Nike Running Shoes",
    price: 4999,
    rating: 4.3,
    category: "Fashion",
    stock: 25,
  },
  {
    id: 4,
    name: "Levi's Jeans",
    price: 2999,
    rating: 4.2,
    category: "Fashion",
    stock: 15,
  },
  {
    id: 5,
    name: "Wooden Study Table",
    price: 12000,
    rating: 4.6,
    category: "Furniture",
    stock: 5,
  },
  {
    id: 6,
    name: "Office Chair",
    price: 8500,
    rating: 4.4,
    category: "Furniture",
    stock: 10,
  },
  {
    id: 7,
    name: "Boat Headphones",
    price: 1999,
    rating: 4.1,
    category: "Electronics",
    stock: 30,
  },
  {
    id: 8,
    name: "Backpack",
    price: 1499,
    rating: 4.0,
    category: "Accessories",
    stock: 40,
  },
];

function Dashboard2() {
  const [sortOption, setSortOption] = useState(null);
  const [sortDir, setSortDirc] = useState("asc");
  const [searchWord, setSearch] = useState("");

  function handleSort(key) {
    if (sortOption == key) {
      setSortDirc((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortOption(key);
      setSortDirc("asc");
    }
  }

  const sortedData = useMemo(() => {
    return [...products].sort((a, b) => {
      if (!sortOption) return 0;
      let comp = 0;
      if (sortOption == "name") {
        comp = a.name.localeCompare(b.name);
      } else if (sortOption == "price") {
        comp = a.price - b.price;
      } else if (sortOption == "rating") {
        comp = a.rating - b.rating;
      }
      return sortDir == "asc" ? comp : -comp;
    });
  }, [sortOption, sortDir]);

  const timerRef = useRef(null);
  function handleChange(e) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  }

  console.log(searchWord, "search-----");
  const filteredWords = useMemo(() => {
    return sortedData.filter((eachValue, index) => {
      return eachValue.name.toLowerCase().includes(searchWord.toLowerCase());
    });
  }, [sortedData, searchWord]);

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => handleChange(e)} />
      </div>
      <table>
        <thead>
          <tr style={{ display: "flex", gap: "88px" }}>
            {Object.keys(products[0]).map((eachKey, index) => {
              return <th onClick={() => handleSort(eachKey)}>{eachKey}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((eachObj, index) => {
            return (
              <tr>
                <td>{eachObj.id}</td>
                <td>{eachObj.name}</td>
                <td>{eachObj.price}</td>
                <td>{eachObj.rating}</td>
                <td>{eachObj.category}</td>
                <td>{eachObj.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard2;
