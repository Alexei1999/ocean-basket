import { DrawerWrapper } from "@shared/components/drawer/drawer-wrapper";
import { onSetCategoriesSidebarOpen } from "@shared/components/drawer/filter-menu";
import { Categories } from "./Categories";

export function MobileCategoryMenu() {
  return (
    <DrawerWrapper onClose={() => onSetCategoriesSidebarOpen(false)}>
      <div className="h-full max-h-full overflow-hidden">
        <Categories className="!block" />
      </div>
    </DrawerWrapper>
  );
}
