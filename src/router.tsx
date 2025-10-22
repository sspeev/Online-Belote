import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree, context: {} });
// Augment the @tanstack/react-router module to register the custom router type for type safety.
declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}

const Router = () => {
    return <RouterProvider router={router} context={{}} />;
}

export default Router;
