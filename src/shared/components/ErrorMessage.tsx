interface Props {
  message?: string | undefined;
}

export const Error = ({ message }: Props) => {
  return <p className="my-2 text-xs text-start text-red-500">{message}</p>;
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="bg-red-400 p-5 mx-auto max-w-sm min-w-min text-center text-lg text-light font-semibold rounded">
      {message}
    </p>
  );
};
