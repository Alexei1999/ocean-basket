import { LogoIcon } from "@assets/Icons";
import { CloseIcon } from "@entities/cart/components/icons/close-icon";

export const DrawerWrapper: React.FC = ({ children }) => {
  const [_, closeSidebar] = [, () => null] as any;
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 mb-4 md:mb-6 border-b border-border-200 border-opacity-75">
        <LogoIcon className="w-24 md:w-auto" />
        <button
          onClick={() => closeSidebar({ display: false, view: "" })}
          className="w-7 h-7 flex items-center justify-center rounded-full text-body bg-gray-200 transition-all duration-200 focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
        >
          <span className="sr-only">Закрыть</span>
          <CloseIcon className="w-2.5 h-2.5" />
        </button>
      </div>
      {/* End of header part */}

      {children}
      {/* End of menu part */}
    </div>
  );
};