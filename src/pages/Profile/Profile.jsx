import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthContext();
  const { documents: userPosts, loading } = useFetchDocuments("posts", null, user.uid);
  const [userName, setUserName] = useState("");
  
  // Limpar quaisquer propriedades de data dos posts
  const cleanUserPosts = userPosts ? userPosts.map(post => {
    const cleanPost = { ...post };
    if (cleanPost.createdAt) delete cleanPost.createdAt;
    return cleanPost;
  }) : null;
  
  useEffect(() => {
    if (user) {
      setUserName(user.displayName || user.email.split("@")[0]);
    }
  }, [user]);
  
  return (
    <div className={styles.profile}>
      <h1>Meu Perfil</h1>
      
      <div className={styles.user_info}>
        <div className={styles.avatar}>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt={userName} />
          ) : (
            <div className={styles.avatar_placeholder}>
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className={styles.user_details}>
          <h2>{userName}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      
      <div className={styles.user_posts}>
        <h3>Meus Posts</h3>
        
        {loading && <p>Carregando seus posts...</p>}
        
        {cleanUserPosts && cleanUserPosts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Você ainda não criou nenhum post</p>
            <Link to="/post/new" className="btn">
              Criar meu primeiro post
            </Link>
          </div>
        )}
        
        {cleanUserPosts && cleanUserPosts.length > 0 && (
          <div className={styles.posts_list}>
            <h4>Você tem {cleanUserPosts.length} post(s) publicado(s)</h4>
            
            {cleanUserPosts.map((post) => (
              <div className={styles.post_item} key={post.id}>
                <h4>{post.title}</h4>
                <div className={styles.post_actions}>
                  <Link to={`/post/${post.id}`} className="btn btn-outline">
                    Ver Post
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 