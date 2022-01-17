export function OrderDescriptionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-24 2xl:px-64 bg-gray-100 rounded-2xl text-body text-sm">
      <div className="shadow-700 bg-light px-8 md:px-16 py-14">{children}</div>
    </div>
  );
}
