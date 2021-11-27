import { withRouter } from "./with-router";

//TODO: Add composing functions to compose the providers
export const withProviders = (component: () => React.ReactNode) => {
  return withRouter(component);
};
