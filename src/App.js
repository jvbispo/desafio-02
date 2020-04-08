import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositores(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post("repositories", {
      title: `repository ${Math.ceil(Math.random() * 100)}`,
    });
    setRepositores([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filtered = repositories.filter((repo) => repo.id !== id);
    console.log(filtered);
    setRepositores(filtered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
