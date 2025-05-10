import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search_form}>
      <input
        type="text"
        placeholder="Buscar posts..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className="btn">Buscar</button>
    </form>
  );
};

export default SearchForm; 