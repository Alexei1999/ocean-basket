import { CartSidebarView } from "@entities/cart/components/cart-sidebar-view";

export const OrderOverview = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10">
        {/* Contact form */}
        <div className="w-full relative md:w-72 flex-shrink-0 lg:w-96 order-1 md:order-2 mb-8 md:mb-0 md:ms-7 lg:ms-9 bg-light max-h-140">
          <CartSidebarView
            isFlat
            onSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>

        {/* sidebar */}
        <div className="w-full bg-light p-5  order-2 md:order-1">left</div>
      </div>
    </div>
  );
};
