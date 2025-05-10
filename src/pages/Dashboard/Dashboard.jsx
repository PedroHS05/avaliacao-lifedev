import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthContext } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { documents: posts, loading, error } = useFetchDocuments("posts", null, user.uid);
  const { deleteDocument, response } = useDeleteDocument("posts");

  if (loading) {
    return <div className={styles.loading}>Carregando posts...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Limpar quaisquer propriedades de data dos posts
  const cleanPosts = posts ? posts.map(post => {
    const cleanPost = { ...post };
    if (cleanPost.createdAt) delete cleanPost.createdAt;
    return cleanPost;
  }) : null;

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>
      
      <div className={styles.new_post}>
        <Link to="/post/new" className="btn">
          Criar novo post
        </Link>
      </div>
      
      {cleanPosts && cleanPosts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>Você ainda não tem posts publicados</p>
        </div>
      ) : (
        <div className={styles.post_list}>
          {cleanPosts && cleanPosts.map((post) => (
            <div className={styles.post} key={post.id}>
              <h3>{post.title}</h3>
              <div className={styles.post_info}>
                <p className={styles.created_by}>por {post.createdBy}</p>
              </div>
              <div className={styles.actions}>
                <Link to={`/post/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                <button
                  onClick={() => deleteDocument(post.id)}
                  className={styles.delete_btn}
                  disabled={response.loading}
                >
                  {response.loading ? "Excluindo..." : "Excluir"}
                </button>
              </div>
              {response.error && <p className="error">{response.error}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
