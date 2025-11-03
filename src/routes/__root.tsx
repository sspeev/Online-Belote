import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Layout from '../app/Layout'

type RouterContext = {};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Layout />
      <TanStackDevtools
        config={{
          defaultOpen: false,
          openHotkey: ['Shift', 'A'],
          position: 'bottom-left',
          theme: 'dark'
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  errorComponent: ({ error }) => <div>{`Root route error: ${error.message}`}</div>,
  notFoundComponent: () => <div>Root route not found</div>,
})
