const Card = ({ children }) => {
  return (
    <div className="min-h-[625px] items-center flex justify-center rounded-3xl border border-white">
      {children}
    </div>
  );
};

export default Card;