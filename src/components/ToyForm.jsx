import React, { useState } from "react";

const BASE_URL = "http://localhost:3001";

function ToyForm({ onCreate }) {
  const [form, setForm] = useState({ name: "", image: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e){
    e.preventDefault();

    const newToy = {...form, likes: 0 };

    fetch(`${BASE_URL}/toys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((toy) => {
        onCreate(toy); // update state in ToyContainer
        setForm({ name: "", image: "" }); // reset form
      })
      .catch((err) => console.error("Failed to create toy:", err));
  }
  
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={form.name}
          onChange={(handleChange)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={form.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
