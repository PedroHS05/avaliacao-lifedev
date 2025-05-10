# MiniDevBlog - Desenvolvimento Web 3

## Sobre o Projeto

Este é um Mini Blog para desenvolvedores compartilharem seus conhecimentos e experiências. O projeto foi desenvolvido como parte da avaliação da disciplina de Desenvolvimento Web 3, utilizando React e Firebase.

## Funcionalidades Implementadas

### 1. Sistema de Autenticação
- Login com email/senha
- Login com Google (Firebase OAuth)
- Proteção de rotas para usuários não autenticados
- Contexto de autenticação para gerenciar o estado do usuário

### 2. Rotas
- `/login` - Página de login (acesso público)
- `/register` - Página de registro (acesso público)
- `/dashboard` - Listagem de posts (acesso protegido)
- `/post/:id` - Visualização individual de post (acesso protegido)
- `/post/new` - Criação de novo post (acesso protegido)
- `/profile` - Perfil do usuário (acesso protegido)
- `/search` - Busca de posts (acesso público)

### 3. Componentes
- `PrivateRoute` - Componente para proteção de rotas
- `Navbar` - Menu de navegação condicional baseado na autenticação
- `Dashboard` - Listagem de posts
- `CreatePost` - Formulário para criação de posts
- `Post` - Visualização individual de post
- `ThemeToggle` - Alternância entre tema claro e escuro

### 4. Hooks Personalizados
- `useAuthentication` - Gerencia operações de autenticação
- `useAuthContext` - Fornece acesso ao contexto de autenticação
- `useFetchDocuments` - Busca múltiplos documentos do Firestore
- `useFetchDocument` - Busca um documento específico do Firestore
- `useInsertDocument` - Insere um novo documento no Firestore
- `useTheme` - Gerencia tema claro/escuro

### 5. Deploy
- Configuração do Firebase Hosting
- Pipeline de CI/CD com GitHub Actions
- Deploy automático em branches de avaliação

## Como Fazer o Deploy

O projeto está configurado para deploy automático através do GitHub Actions. Quando você envia código para uma branch que começa com `avaliacaodw-`, o GitHub Actions executará automaticamente o pipeline de deploy.

Para fazer deploy manualmente:

1. Construa o projeto:
   ```
   npm run build
   ```

2. Usando o Firebase CLI:
   ```
   firebase login
   firebase deploy
   ```

## Como Testar

1. Clone o repositório:
   ```
   git clone [URL_DO_REPOSITÓRIO]
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Execute o projeto localmente:
   ```
   npm run dev
   ```

4. Para testar as funcionalidades:
   - Faça login usando sua conta Google
   - Navegue até a Dashboard para ver os posts existentes
   - Crie um novo post através do botão "Criar novo post"
   - Visualize o post criado clicando em "Ver"
   - Experimente alternar entre os temas claro e escuro

## Problemas e Soluções

### Tema Escuro
- Problema: Textos desapareciam no tema escuro
- Solução: Ajustamos as variáveis CSS para garantir contraste adequado, modificando cores de texto no tema escuro para "#f0f0f0"

## Tecnologias Utilizadas
- React
- Firebase (Authentication, Firestore, Hosting)
- React Router
- GitHub Actions
- CSS Modules para estilização
- Vite como bundler

## Autor
[Pedro henrique Scabelo]

---

Link do deploy:
https://avaliacao-lifedev-dc6e9.web.app/

*Nota: Este projeto foi desenvolvido como parte da avaliação da disciplina de Desenvolvimento Web 3.*

