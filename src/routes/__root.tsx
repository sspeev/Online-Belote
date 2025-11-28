import { createRootRouteWithContext } from '@tanstack/react-router'

import Layout from '../app/Layout'
//import { useLobby } from '@/hooks/useLobby.ts'

type RouterContext = {};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
      <Layout />
  ),
  errorComponent: () => {
    //const { lobbyData } = useLobby()

    return (
      <div className="error-container">
        {/*<p>Unexpected error: {lobbyData.error}</p>*/}
        <button onClick={() : void => window.location.reload()}>
          <p>Retry</p>
        </button>
      </div>
    )
  },
  notFoundComponent: () => <div>Root route not found</div>,
})
