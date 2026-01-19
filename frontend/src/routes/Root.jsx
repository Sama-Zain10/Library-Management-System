import Navbar from "../Components/Shared/Navbar";

const Root = ({ children }) => {
  return (
    <div className="w-screen min-h-screen relative">
      <Navbar />
      <div className="pt-20 w-full min-h-screen">{children}</div>
    </div>
  );
};

export default Root;
