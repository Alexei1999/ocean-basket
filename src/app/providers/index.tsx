import { withRouter } from "./with-router";
import { withToasts } from "./with-toasts";

//TODO: Add composing functions to compose the providers
export const withProviders = (component: () => React.ReactNode) => {
  return withRouter(withToasts(component));
};
