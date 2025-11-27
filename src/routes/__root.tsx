import { createRootRouteWithContext } from '@tanstack/react-router'

import Layout from '../app/Layout'

type RouterContext = {};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
      <Layout />
  ),
  errorComponent: ({ error }) => <div>{`Root route error: ${error.message}`}</div>,
  notFoundComponent: () => <div>Root route not found</div>,
})
