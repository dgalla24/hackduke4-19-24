import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;
    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse("⚠️ Error: Unable to connect to backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        🚑 LLaMAid: Offline Ambulance AI Copilot
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows="6"
          placeholder="Describe the emergency..."
          style={{
            width: "100%",
            fontSize: "1rem",
            padding: "1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />
        <br />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: "linear-gradient(to right, #f43f5e, #fb7185)",
            border: "none",
            padding: "0.75rem 1.5rem",
            color: "white",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>

      {response && (
        <div
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #eee",
            padding: "1rem",
            marginTop: "2rem",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            AI Response
          </h2>
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
