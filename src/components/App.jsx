import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const BASE_URL = "http://localhost:3001";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/toys`)
      .then((res) => res.json())
      .then(setToys)
      .catch((err) => console.error("Failed to fetch toys:", err));
  }, []);

  function handleClick() {
    setShowForm((show) => !show);
  }

  function handleCreate(createdToy) {
    setToys((xs) => [createdToy, ...xs]);
  }

  function handleLike(id) {
    const current = toys.find((t) => t.id === id);
    if (!current) return;

    fetch(`${BASE_URL}/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: current.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updated) => setToys((xs) => xs.map((t) => (t.id === id ? updated : t))))
      .catch((err) => console.error("Failed to like toy:", err));
  }

  function handleDonate(id) {
    fetch(`${BASE_URL}/toys/${id}`, { method: "DELETE" })
      .then(() => setToys((xs) => xs.filter((t) => t.id !== id)))
      .catch((err) => console.error("Failed to delete toy:", err));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onCreate={handleCreate} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLike={handleLike} onDonate={handleDonate} />
    </>
  );
}

export default App;
