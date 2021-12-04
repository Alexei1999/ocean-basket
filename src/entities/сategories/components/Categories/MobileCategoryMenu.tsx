import { DrawerWrapper } from "@shared/components/drawer/drawer-wrapper";
import { Categories } from "./Categories";

export function MobileCategoryMenu() {
  return (
    <DrawerWrapper>
      <div className="h-full max-h-full overflow-hidden">
        <Categories className="!block" />
      </div>
    </DrawerWrapper>
  );
}
