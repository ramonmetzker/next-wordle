type WrapperProps = {
  children: React.ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Wrapper;
