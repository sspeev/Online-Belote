import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Layout from '../app/Layout'


const RootComponent = () => {
  return (
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
  )
}
type RouterContext = {};
export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error }) => <div>{`Root route error: ${error.message}`}</div>,
  notFoundComponent: () => <div>Root route not found</div>,
})
