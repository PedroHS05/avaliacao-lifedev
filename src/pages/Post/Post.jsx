import { useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);

  if (loading) {
    return <div className={styles.loading}>Carregando post...</div>;
  }

  if (error) {
    return <div className={styles.not_found}>{error}</div>;
  }

  if (!post) {
    return <div className={styles.not_found}>Post não encontrado!</div>;
  }

  // Remover qualquer propriedade relacionada a datas para garantir que não sejam exibidas
  const cleanPost = { ...post };
  if (cleanPost.createdAt) delete cleanPost.createdAt;

  return (
    <div className={styles.post_container}>
      <h1>{cleanPost.title}</h1>
      <div className={styles.post_info}>
        <div className={styles.post_author}>
          <p>por {cleanPost.createdBy}</p>
        </div>
      </div>
      <div className={styles.post_content}>
        <p>{cleanPost.body}</p>
      </div>
    </div>
  );
};

export default Post; 