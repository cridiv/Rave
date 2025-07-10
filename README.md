# Rave 

**Rave** is a collaborative AI-powered roadmap planning tool designed for developers, teams, and innovators. It helps you brainstorm, structure, and evolve your project ideas into executable technical roadmaps — all powered by intelligent suggestions and a sleek interface.

---

## ✨ Features

-  **Auth with Supabase** – Secure login/signup with OAuth support  
-  **AI Chat Integration** – Discuss goals and ideas with an AI assistant  
-  **Smart Roadmap Generation** – Turn goals into structured tech plans  
-  **Roadmap History** – Track your brainstorming and revisions  
-  **Session Management** – Organize multiple projects in one place  
-  **Monorepo Architecture** – Cleanly separated API and frontend apps  

---

## 🛠️ Tech Stack

| Layer        | Tech                                      |
|--------------|-------------------------------------------|
| **Frontend** | Next.js 14, TailwindCSS, React Icons      |
| **Backend**  | NestJS (REST API)                         |
| **Database** | Supabase (PostgreSQL + Auth)              |
| **Infra**    | Render (deployment), Vercel (frontend)    |
| **AI**       | OpenAI API (chat + roadmap generation)    |
| **Other**    | TypeScript, ESM, Turbo monorepo setup     |

---

## 🚀 Getting Started


### 1. Clone the Repository

```bash
git clone https://github.com/cridiv/Rave.git
cd Rave
```

### 2. Install Dependencies

```bash
npm install
```

Or if you're using pnpm:

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and include:

```env
# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Frontend use
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Note:** Make sure to also set these values in Vercel and Render during deployment.

### 4. Run the App Locally

In two terminals, run both frontend and backend:

**Backend (NestJS API)**
```bash
cd apps/api
npm run start:dev
```

**Frontend (Next.js)**
```bash
cd apps/web
npm run dev
```

App will be available at `http://localhost:3000`

---

## 🌐 Deployment

### 📡 Backend (Render)

1. Connect the repo on Render
2. Set the root directory to `apps/api`
3. Set your environment variables
4. Use the build command:
   ```bash
   npm install && npm run build
   ```
5. Start command:
   ```bash
   npm run start:prod
   ```

### 🧑‍💻 Frontend (Vercel)

1. Connect the repo on Vercel
2. Set the root directory to `apps/web`
3. Add all required `.env` variables
4. Deploy

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a new branch: `git checkout -b feat/your-feature-name`
3. Commit your changes: `git commit -m "feat: your update"`
4. Push the branch: `git push origin feat/your-feature-name`
5. Open a pull request

---

## 👨‍💻 Authors

- **Aderemi Ademola** – Backend Lead, Fullstack & AI Engineer (X: @cridiv)
- **Peters Joshua** – Frontend Lead, Fullstack Developer (X: @joshpet77)
- **Oyedapo Kayode** – Product Designer (X: @Kayode_96)

---

## 📜 License

This project is licensed under the MIT License

---


*Built with ❤️ by developers, for developers*
