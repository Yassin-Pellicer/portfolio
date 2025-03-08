const Card = ({ children }) => {
  return (
    <div className="flex justify-center rounded-3xl border border-white">
      {children}
    </div>
  );
};

export default Card;