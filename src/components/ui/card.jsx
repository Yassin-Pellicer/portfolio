const Card = ({ children }) => {
  return (
    <div className="xl:min-h-[625px] xl:items-center flex justify-center rounded-3xl border border-white">
      {children}
    </div>
  );
};

export default Card;