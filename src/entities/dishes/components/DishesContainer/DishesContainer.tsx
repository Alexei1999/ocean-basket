import cn from "classnames";
import { items } from "../../config/dishes";
import { DishCard } from "../Card/DishCard";
import { NotFound } from "../NotFound";
import { ProductLoader } from "./ProductLoader";

export declare type Attachment = {
  id?: number | string;
  thumbnail?: string;
  original?: string;
};

export declare type Category = {
  id: number | string;
  name: string;
  slug: string;
};

export declare type Product = {
  id?: number | string;
  name?: string;
  slug?: string;
  ingridients: string[];
  deliveryFee?: number;
  isApproximate?: boolean;
  isDiscount?: boolean;
  isAvailable?: boolean;
  is_taxable?: boolean;
  price: number;
  image?: Attachment;
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  ...props
}) => {
  return <DishCard product={product} {...props} className={className} />;
};

export const DishesContainer: React.FC = () => {
  if (false) {
    //TODO: Уточнить текстовки у бизнеса
    return (
      <div className="bg-gray-100 w-full min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="Меню для данной категории отсутствует" className="w-7/12 mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn("flex-1 bg-gray-100 pt-6 pb-8 pl-4 lg:p-8 xl:pr-32")}>
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3")}
      >
        {false ? (
          <>
            {Array(20)
              .fill(null)
              .map((_, i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))}
          </>
        ) : (
          items.map((product) => (
            <div key={product.id}>
              {/* @ts-ignore */}
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
