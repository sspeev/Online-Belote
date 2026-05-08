import { createRootRouteWithContext } from '@tanstack/react-router'

import Layout from '../app/Layout'
import ErrorComponent from '../app/components/common/Error'
import NotFound from '../app/components/common/NotFound'

type RouterContext = {
  playerName: string | null
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
      <Layout />
  ),
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  notFoundComponent: NotFound,
})
