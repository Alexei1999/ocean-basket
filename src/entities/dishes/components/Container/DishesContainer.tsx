import cn from "classnames";
import { ReactElement } from "react";
import { items } from "../../config/dishes";
import Helium from "./Helium";
import NotFound from "./NotFound";
import { ProductLoader } from "./ProductLoader";

export type Banner = {
  title: string;
  description: string;
  image: {
    id: string;
    original: string;
    thumbnail: string;
  };
};

export declare type Type = {
  id: number | string;
  name: string;
  slug: string;
  icon: string;
  banners: Banner[];
  promotional_sliders: any[];
  settings: {
    isHome: boolean;
    layoutType: string;
    productCard: string;
  };
  // products?: Maybe<ProductPaginator>;
  created_at: Date;
  updated_at: Date;
};

export declare type Attachment = {
  id?: number | string;
  thumbnail?: string;
  original?: string;
};

export declare type Category = {
  id: number | string;
  name: string;
  slug: string;
  parent?: number;
  children: Category[];
  details?: string;
  image?: Attachment;
  icon?: string;
  type: Type;
  products: Product[];
  created_at: Date;
  updated_at: Date;
};

export declare type AttributeValue = {
  id: string;
};

export declare type Variation = {
  id: string;
  options?: any;
};

export declare type Product = {
  id?: number | string;
  name?: string;
  slug?: string;
  type?: Type;
  categories?: Category[];
  variations: AttributeValue[];
  variation_options: Variation[];
  // pivot?: OrderProductPivot
  // orders: Order[]
  shop?: any;
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: Attachment[];
  image?: Attachment;
  // status?: ProductStatus
  height?: string;
  length?: string;
  width?: string;
  price?: number;
  min_price?: number;
  max_price?: number;
  related_products?: Product[];
  quantity?: number;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
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
  return <Helium product={product} {...props} className={className} />;
};

export const DishesContainer: React.FC = ({ children }) => {
  if (false) {
    return (
      <div className="bg-gray-100 w-full min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound className="w-7/12 mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn("flex-1 bg-gray-100 pt-6 pb-8 px-4 lg:p-8")}>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-3",
          "md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7"
        )}
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
