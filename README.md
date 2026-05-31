<div align="center">

# 🃏 Online Belote

**A modern, real-time multiplayer Belote card game**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SignalR](https://img.shields.io/badge/SignalR-9.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/apps/aspnet/signalr)

</div>

---

## 📖 About

Online Belote is a real-time multiplayer web application for playing **Belote**, the classic French card game. Built with modern web technologies, it offers seamless gameplay with smooth animations, real-time communication, and an elegant user interface.

### ✨ Features

- 🎮 **Real-time multiplayer gameplay** using SignalR
- 🎨 **Beautiful UI** with Tailwind CSS and smooth GSAP animations
- 🏠 **Lobby system** for creating and joining games
- 🎯 **Interactive card gameplay** with drag-and-drop support
- 📱 **Responsive design** for desktop and mobile devices
- 🔄 **Live game state synchronization** across all players
- ⚡ **Fast and modern** - Built with Vite and React 19

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/sspeev/Online-Belote.git
cd Online-Belote

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Open Vitest UI |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Run Prettier |
| `npm run check` | Format and lint files |
| `npm run type-check` | Run TypeScript type checking |

### Project Structure

```
Online-Belote/
├── src/
│   ├── api/              # API endpoints and services
│   │   ├── game/         # Game-related endpoints
│   │   ├── lobby/        # Lobby management endpoints
│   │   └── services/     # SignalR and other services
│   ├── app/              # Application components
│   ├── assets/           # Images, icons, and static assets
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── routes/           # TanStack Router routes
│   ├── types/            # TypeScript type definitions
│   │   ├── models/       # Game models (Card, Player, Team, etc.)
│   │   └── enums/        # Enumerations (Suit, etc.)
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── tests/                # Test files
```

---

## 🐳 Docker Deployment

### Development with Docker

```bash
# Start development container with hot reload
docker compose up dev

# Or run in detached mode
docker compose up -d dev
```

### Production with Docker

```bash
# Build and start production container
docker compose up prod

# Or build and run separately
docker build -t online-belote:prod .
docker run -p 3000:3000 online-belote:prod
```

---

## 🧰 Technology Stack

### Frontend
- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS

### Real-time Communication
- **[SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr)** - Real-time web functionality
- **[Axios](https://axios-http.com/)** - HTTP client

### Animations
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animations
- **[Motion](https://motion.dev/)** - Modern animation library

### Testing
- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[Testing Library](https://testing-library.com/)** - Testing utilities

### Code Quality
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TanStack ESLint Config](https://tanstack.com/config/latest/docs/eslint)** - Shared ESLint configuration

---

## 🎮 How to Play

### Game Rules

Belote is a trick-taking card game played with 4 players in 2 teams:
- **Teams**: North-South vs East-West
- **Objective**: Be the first team to reach the winning score
- **Gameplay**: Players bid, declare trump, and try to win tricks

### Getting Started

1. **Create or Join a Lobby**
   - Click "Create Lobby" to start a new game
   - Or browse available lobbies and click "Join"

2. **Wait for Players**
   - Game starts when 4 players have joined

3. **Play the Game**
   - Follow the bidding phase
   - Play cards when it's your turn
   - Try to win tricks and score points!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Run `npm run check` before committing
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [TanStack](https://tanstack.com/) ecosystem
- Card game rules based on the traditional French Belote
- Inspired by the love of card games and modern web development

---

<div align="center">

**[⬆ back to top](#-online-belote)**

Made with ❤️ by [sspeev](https://github.com/sspeev)

</div>
