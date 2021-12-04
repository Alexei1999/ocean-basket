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
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <>
            <rect
              x="0"
              y={5 + index * 50}
              rx="5"
              ry="5"
              width="40%"
              height="20"
            />
          </>
        ))}

      {/* <circle cx="13" cy="48" r="10" />
      <rect x="38" y="38" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="83" r="10" />
      <rect x="38" y="73" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="118" r="10" />
      <rect x="38" y="108" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="154" r="10" />
      <rect x="38" y="144" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="188" r="10" />
      <rect x="38" y="178" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="223" r="10" />
      <rect x="38" y="213" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="258" r="10" />
      <rect x="38" y="248" rx="5" ry="5" width="70%" height="20" />
      <circle cx="13" cy="290" r="10" />
      <rect x="38" y="280" rx="5" ry="5" width="70%" height="20" /> */}
    </ContentLoader>
  );
};
