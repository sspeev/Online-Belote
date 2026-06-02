---
name: Online Belote - Development Guide
description: Complete development guide for the Online Belote multiplayer card game project
type: reference
---

# 🃏 Online Belote Development Guide

## 🎯 Project Overview

**Online Belote** is a real-time multiplayer Belote card game built with React 19, TypeScript, and SignalR for WebSocket-based real-time communication.

### Core Features
- Real-time multiplayer gameplay using SignalR
- Lobby system for creating/joining games
- Interactive card gameplay with drag-and-drop
- Beautiful UI with Tailwind CSS and GSAP animations
- Responsive design for desktop and mobile

---

## 🛠️ Tech Stack & Key Technologies

### Frontend
- **React 19** - UI library with latest features
- **TypeScript 5.7** - Type-safe development
- **Vite 7.1** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing with file-based routes
- **Tailwind CSS 4** - Utility-first CSS framework
- **GSAP 3** - Professional-grade animations
- **SignalR 9.0** - Real-time web functionality

### Testing & Quality
- **Vitest** - Fast unit test framework
- **Testing Library** - React testing utilities
- **ESLint** - Code linting (via `@tanstack/eslint-config`)
- **Prettier** - Code formatting
- **@testing-library/react** - Component testing

---

## 📁 Project Structure

```
src/
├── api/                 # API endpoints and services
│   ├── axios.ts        # Axios instance configuration
│   ├── game/           # Game-related endpoints
│   │   ├── common.ts   # Shared game API logic
│   │   └── endpoints/  # Individual endpoint implementations
│   │       ├── makeBid.ts
│   │       ├── playCard.ts
│   │       └── start.ts
│   ├── lobby/          # Lobby management endpoints
│   │   ├── common.ts   # Shared lobby logic
│   │   └── endpoints/  # Lobby endpoints
│   │       ├── all.ts
│   │       ├── create.ts
│   │       └── find.ts
│   └── services/       # API service layer
│       ├── GameService.ts
│       ├── LobbyService.ts
│       └── signalRService.ts  # SignalR connection management

├── app/                # Application components
│   ├── components/     # Shared and feature components
│   │   ├── common/     # Reusable components (Button, Spinner, etc.)
│   │   ├── game/       # Game-specific components
│   │   │   ├── BiddingPanel.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── DeckPile.tsx
│   │   │   ├── GameBoard.tsx
│   │   │   ├── GameOverScreen.tsx
│   │   │   ├── GameStatus.tsx
│   │   │   ├── Hands.tsx
│   │   │   ├── PlayerPlate.tsx
│   │   │   └── PlayedCards.tsx
│   │   └── lobby/      # Lobby components
│   │       ├── LobbyLayout.tsx
│   │       ├── PlayerBox.tsx
│   │       ├── Waiting.tsx
│   │       └── Results.tsx
│   ├── Layout.tsx      # Root layout component
│   └── Index.tsx       # Error boundary

├── context/            # React context providers
│   ├── global/         # Global app state
│   │   ├── actions.ts
│   │   ├── context.ts
│   │   ├── reducer.ts
│   │   ├── types.ts
│   │   └── Provider.ts
│   ├── lobby/          # Lobby state management
│   │   ├── actions.ts
│   │   ├── context.ts
│   │   ├── reducer.ts
│   │   └── types.ts
│   └── player/         # Player state management
│       ├── actions.ts
│       ├── context.ts
│       ├── reducer.ts
│       └── types.ts

├── hooks/              # Custom React hooks
│   ├── useLobby.ts     # Lobby-related hooks
│   └── usePlayer.ts    # Player-related hooks

├── routes/            # TanStack Router routes
│   ├── __root.tsx     # Root route
│   ├── create.tsx     # Create lobby route
│   ├── index.tsx      # Home route
│   ├── join.tsx       # Join lobby route
│   └── lobby/         # Lobby-specific routes
│       ├── route.tsx
│       ├── $lobbyId/  # Dynamic lobby routes
│       │   ├── game/
│       │   │   └── gameboard.tsx
│       │   └── waiting.tsx
│       └── results.tsx

├── types/              # TypeScript type definitions
│   ├── enums/         # Type enums
│   │   ├── Announces.ts (Bid actions: Pass, Clubs, etc.)
│   │   ├── btnShape.ts
│   │   └── Suit.ts
│   └── models/        # Domain models
│       ├── Card.ts    # Card type with suit, rank, value
│       ├── Game.ts    # Game state (teams, players, contract)
│       ├── Lobby.ts   # Lobby information
│       ├── Player.ts  # Player state and hand
│       ├── Team.ts    # Team definitions
│       └── Trick.ts   # Trick tracking

├── main.tsx           # Application entry point
└── vite-env.d.ts      # Vite-specific type declarations

public/                # Static assets
tests/                 # Test files
```

---

## 🔑 Core Architecture Patterns

### 1. **Context-Based State Management**
Each major feature has its own Context Provider:
- `LobbyContext` - Manages lobby state and game flow
- `PlayerContext` - Manages player authentication and selection
- `GlobalContext` - Global app-level state

### 2. **Service Layer Pattern**
```typescript
// Pattern: Service layer handles API calls and dispatches actions
export const findLobby = async (
  dispatchLobby: Dispatch<LobbyAction>,
  playerData: PlayerState
) => {
  const response = await find(playerData.player.lobbyId)
  dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })
}
```

### 3. **TanStack Router File-Based Routing**
Routes are defined in `src/routes/` and automatically generated to `routeTree.gen.ts` via `tsr generate`.

### 4. **SignalR Real-Time Communication**
```typescript
// SignalR connection with automatic reconnection
export const buildConnection = (lobbyId: number): signalR.HubConnection => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/beloteHub?lobbyId=${lobbyId}`)
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .build()
  
  connection.keepAliveIntervalInMilliseconds = 10_000
  connection.serverTimeoutInMilliseconds = 60_000
  return connection
}
```

---

## 📋 Key Types & Enums

### Bid Actions (`Announces` enum)
```typescript
enum Announces {
  None = 0,
  Pass = 1,
  Clubs = 2,
  Diamonds = 3,
  Hearts = 4,
  Spades = 5,
  NoTrump = 6,
  AllTrumps = 7,
  Double = 8,
  ReDouble = 9,
}
```

### Card Type
```typescript
export type Card = {
  id: number
  suit: Suit  // 'hearts' | 'diamonds' | 'clubs' | 'spades'
  rank: '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'
  value: number
  power: number
}
```

### Game State
```typescript
export type Game = {
  teams: Team[]
  sortedPlayers: Player[]
  currentAnnounce: Announces
  currentPlayer: Player
  passCounter: number
  isDoubled: boolean
  isReDoubled: boolean
  contractPlayer?: Player | null
  currentTrick: Trick | null
}
```

---

## 🚀 Development Commands

| Command | Description |
|---------|-----|
| `bun dev` | Start development server on port 3000 |
| `bun run build` | Build for production |
| `bun run type-check` | Run TypeScript type checking |
| `bun run test` | Run tests with Vitest |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Generate test coverage report |
| `bun run test:ui` | Open Vitest UI |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Fix ESLint errors automatically |
| `bun run format` | Run Prettier |
| `bun run check` | Run both format and lint, auto-fix |

---

## 🎯 Common Development Tasks

### Adding a New Component
1. Create component in `src/app/components/{feature}/`
2. Export from appropriate index file
3. Add to relevant context/actions if needed

### Adding a New Route
1. Create route file in `src/routes/`
2. Implement using `createFileRoute`
3. Add to `src/routes/routeTree.gen.ts` via `bun run generate-routes`

### Working with Context
```typescript
// Context pattern
export const LobbyContext = createContext<LobbyContextValue>({} as LobbyContextValue)

// Provider pattern
export const LobbyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lobbyData, setLobbyData] = useState<LobbyState>({})
  const dispatchLobby = useReducer(reducer, {} as LobbyReducerState)
  // ... setup logic
  return (
    <LobbyContext.Provider value={{ lobbyData, dispatchLobby, roundCountdown }}>
      {children}
    </LobbyContext.Provider>
  )
}

// Consumer pattern
export const useLobby = () => {
  const contextValue = useContext(LobbyContext)
  return contextValue
}
```

### SignalR Event Handling
```typescript
// Typical event handler pattern
connection.on('GameEvent', (eventType, payload) => {
  const eventHandlers = {
    onBidMade: (bid) => { /* handle bid */ },
    onCardPlayed: (card) => { /* handle card play */ },
    onGameEnd: (result) => { /* handle game end */ },
  }
  if (eventHandlers[eventType]) {
    eventHandlers[eventType](payload)
  }
})
```

---

## 🔍 Best Practices

### Component Composition
- Use `AnimatedBackground` for consistent background effects
- Use `Spinner` for loading states
- Use `Error` component for error boundaries

### State Management
- Lift state to context when component is used across features
- Use reducer pattern for context actions (`actions.ts` + `reducer.ts`)
- Keep context minimal; use component props for localized state

### Type Safety
- Always define TypeScript types for props and context values
- Use discriminated unions for event types
- Leverage TanStack Router's type-safe navigation

---

## 📝 Testing Guidelines

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

### Setup
Test setup is in `src/test/setup.ts` - ensure vitest config includes this.

---

## 🛡️ Error Handling Pattern

```typescript
try {
  await apiCall()
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Failed'
  dispatch({ type: 'SET_ERROR', message: errorMessage })
  throw error
}
```

---

## 🐳 Docker Configuration

The project uses Docker Compose for both development and production:
- `docker-compose.dev.yml` - Development environment with hot reload
- `docker-compose.prod.yml`` - Production optimized build

### Key Environment Variables
- `VITE_API_URL` - Backend API URL (set as Docker build arg)
- `NODE_ENV` - development | production

---

## 🚦 Code Quality

### ESLint Configuration
Uses `@tanstack/eslint-config` for consistent rules across the stack.

### Prettier
Automatic formatting is handled by Prettier 3.5.3.

### Run Before Commit
```bash
bun run check  # Format + lint with auto-fix
bun run type-check  # Verify TypeScript types
bun run test  # Ensure tests pass
```

---

## 🔗 External Resources

- [SignalR Documentation](https://learn.microsoft.com/dotnet/aspnet/signalr/clients/javascript)
- [Belote Rules](https://en.wikipedia.org/wiki/Belote)
- [TanStack Router Docs](https://tanstack.com/router/latest/docs/framework/react)

---

## 📊 Recent Changes

### Latest Features
- Bidding panel with real-time bid options
- Game status display
- Round results tracking
- Player pass counter tracking
- Double/Redouble mechanics

### Active Development
- Stage 2 development: Bidding system integration
- SignalR event handlers for all game events
- Lobby state synchronization

---

## 🤝 Contributing

See `README.md` for contribution guidelines.

### Quick PR Checklist
- [ ] `bun run check` passes
- [ ] New components are tested
- [ ] TypeScript types are complete
- [ ] Code follows existing patterns
- [ ] README/CLAUDE.md updated if needed
