export function SuggestionCategories({ items }: { items: string[] }) {
  return (
    <div className="md:px-4 lg:px-8 xl:px-32 bg-light py-6 w-full flex">
      {items.map((item, idx) => (
        <span className="mr-11 text-gray-500" key={idx}>
          {item}
        </span>
      ))}
    </div>
  );
}
