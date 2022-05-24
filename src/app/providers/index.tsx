import { withRouter } from "./with-router";
import { withToasts } from "./with-toasts";

declare global {
  interface Window {
    __REACT_DEVELOPERS: Record<string, unknown>;
  }
}

//TODO: Add composing functions to compose the providers
export const withProviders = (component: () => React.ReactNode) => {
  return withRouter(withToasts(component));
};
