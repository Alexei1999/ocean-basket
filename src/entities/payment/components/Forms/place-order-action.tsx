interface Props {
  message: string | undefined;
}

export const ValidationError = ({ message }: Props) => {
  return <p className="my-2 text-sm text-start text-red-500">{message}</p>;
};

export function formatOrderedProduct(product: any) {
  return {
    product_id: product?.productId ? product.productId : product.id,
    ...(product?.variationId
      ? { variation_option_id: product.variationId }
      : {}),
    order_quantity: product.quantity,
    unit_price: product.price,
    subtotal: product.itemTotal,
  };
}
