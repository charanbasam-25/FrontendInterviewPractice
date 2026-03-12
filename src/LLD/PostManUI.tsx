import { useState } from "react";

function Methods({ setMethod, method }) {
  return (
    <select value={method} onChange={(e) => setMethod(e.target.value)}>
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
    </select>
  );
}

function Button({ handleSubmit }) {
  return <button onClick={handleSubmit}>Submit</button>;
}

function InputURL({ url, setUrl }) {
  return (
    <div>
      <input
        style={{ width: "400px"}}
        placeholder="Type the API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  );
}

function RequestBody({ body, setBody }) {
  return (
    <div>
      <h3>Request Body</h3>
      <textarea
        style={{ height: "120px", width: "400px" }}
        placeholder='Example: { "title": "test" }'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
}

function ResponseBody({ responseData, status, time }) {
  return (
    <div style={{ overflow: "sroll" }}>
      <h3>Response</h3>

      <div style={{ marginBottom: "10px" }}>
        <strong>Status:</strong> {status} | <strong>Time:</strong> {time} ms
      </div>

      <pre
        style={{
          background: "#000",
          padding: "15px",
          width: "600px",
          overflow: "auto",
        }}
      >
        {typeof responseData === "string"
          ? responseData
          : JSON.stringify(responseData, null, 2)}
      </pre>
    </div>
  );
}

function PostManUI() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [status, setStatus] = useState(null);
  const [time, setTime] = useState(null);

  async function handleSubmit() {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" && body ? body : undefined,
    };

    try {
      const start = Date.now();

      const response = await fetch(url, options);

      const end = Date.now();
      setTime(end - start);
      setStatus(response.status);

      const text = await response.text();

      try {
        const data = JSON.parse(text);
        setResponseData(data);
      } catch {
        setResponseData(text);
      }
    } catch (error) {
      setResponseData({ error: error.message });
      setStatus("Error");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Mini Postman UI</h1>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Methods method={method} setMethod={setMethod} />
        <InputURL url={url} setUrl={setUrl} />
        <Button handleSubmit={handleSubmit} />
      </div>

      {method !== "GET" && <RequestBody body={body} setBody={setBody} />}

      <div style={{ marginTop: "30px" }}>
        <ResponseBody responseData={responseData} status={status} time={time} />
      </div>
    </div>
  );
}

export default PostManUI;
