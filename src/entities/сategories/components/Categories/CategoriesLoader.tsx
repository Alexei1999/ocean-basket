import ContentLoader from "react-content-loader";

export const CategoriesLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 400 320"
      backgroundColor="#e0e0e0"
      foregroundColor="#cecece"
      {...props}
    >
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <rect
            key={index}
            x="0"
            y={5 + index * 83}
            rx="5"
            ry="5"
            width="50%"
            height="24"
          />
        ))}
    </ContentLoader>
  );
};
