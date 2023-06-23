export const Loader = ({ message }: { message: string }) => {
  return (
    <div className="overflow-hidden">
      <div className="container">
        <div className="text-info">
          <br />
          <div className="text-xl font-bold animate-pulse loader-animation">{message}</div>
        </div>
      </div>
    </div>
  );
};
