import styles from './Home.module.css'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { Link } from 'react-router-dom'
import SearchForm from '../../components/SearchForm'

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");

  // Limpar quaisquer propriedades de data dos posts
  const cleanPosts = posts ? posts.map(post => {
    const cleanPost = { ...post };
    if (cleanPost.createdAt) delete cleanPost.createdAt;
    return cleanPost;
  }) : null;

  return (
    <div className={styles.home}>
      <h1>Posts mais recentes</h1>
      <SearchForm />
      {loading && <p>Carregando...</p>}
      <div className={styles.post_list}>
        {cleanPosts && cleanPosts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/post/new" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {cleanPosts && cleanPosts.map((post) => (
          <div className={styles.post} key={post.id}>
            <h2>{post.title}</h2>
            <p className={styles.createdby}>por {post.createdBy}</p>
            <Link to={`/post/${post.id}`} className="btn btn-outline">
              Ler
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home