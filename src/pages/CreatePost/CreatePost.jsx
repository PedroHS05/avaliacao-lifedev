import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthContext } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthContext();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validar os campos
    if (!title || !body) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Criar objeto do post
      const post = {
        title,
        body,
        uid: user.uid,
        createdBy: user.displayName || user.email.split("@")[0],
      };

      // Inserir o documento
      await insertDocument(post);

      // Redirecionar para a dashboard
      if (!response.error) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setFormError("Ocorreu um erro ao criar o post. Tente novamente mais tarde.");
    }
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar novo post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        {!response.loading && <button className="btn">Criar post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
