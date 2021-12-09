import { useState } from "react";

type TruncateProps = {
  expandedText?: string;
  compressText?: string;
  character: number;
  children: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Truncate: React.FC<TruncateProps> = ({
  children,
  expandedText = "Скрыть",
  compressText = "Читать далее",
  character = 150,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = () => {
    setExpanded((prev) => !prev);
  };
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      return onClick(e);
    }
    toggleLines();
  }
  if (!children) return null;
  const isCharacterLimitExceeded = children.length > character;
  if (!isCharacterLimitExceeded) {
    return <>{children}</>;
  }
  return (
    <>
      {!expanded ? children.substring(0, character) + "..." : children}
      <br />
      <span className="mt-1 inline-block">
        <button
          onClick={handleClick}
          style={{ color: "#009e7f", fontWeight: 700 }}
        >
          {!expanded ? compressText : expandedText}
        </button>
      </span>
    </>
  );
};
export default Truncate;
