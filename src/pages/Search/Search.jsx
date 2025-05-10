import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Search.module.css";

//comentario apenas de teste
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  
  const { documents: posts, loading, error } = useFetchDocuments("posts", query);

  const cleanPosts = posts ? posts.map(post => {
    const cleanPost = { ...post };
    if (cleanPost.createdAt) delete cleanPost.createdAt;
    return cleanPost;
  }) : null;

  return (
    <div className={styles.search_container}>
      <h2>Resultados da busca: {query}</h2>
      
      {loading && <p className="loading">Carregando resultados...</p>}
      
      {error && <p className="error">{error}</p>}
      
      {cleanPosts && cleanPosts.length === 0 && (
        <div className={styles.no_results}>
          <p>Não foram encontrados posts com a busca: <span>{query}</span></p>
          <Link to="/" className="btn">Voltar</Link>
        </div>
      )}
      
      {cleanPosts && cleanPosts.length > 0 && (
        <div className={styles.search_results}>
          {cleanPosts.map((post) => (
            <div className={styles.post} key={post.id}>
              <h3>{post.title}</h3>
              <p className={styles.created_by}>por {post.createdBy}</p>
              <Link to={`/post/${post.id}`} className="btn btn-outline">
                Ler
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search; 