import { DrawerWrapper } from "@shared/components/drawer/drawer-wrapper";
import { onSetFilterMenuOpen } from "@shared/components/drawer/filter-menu";
import { Categories } from "./Categories";

export function MobileCategoryMenu() {
  return (
    <DrawerWrapper onClose={() => onSetFilterMenuOpen(false)}>
      <div className="h-full max-h-full overflow-hidden">
        <Categories className="!block" />
      </div>
    </DrawerWrapper>
  );
}
