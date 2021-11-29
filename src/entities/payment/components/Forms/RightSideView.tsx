import isEmpty from "lodash/isEmpty";
import { UnverifiedItemList } from "./unverified-item-list";
import VerifiedItemList from "./verified-item-list";

export const RightSideView = () => {
  return <UnverifiedItemList />;
};
