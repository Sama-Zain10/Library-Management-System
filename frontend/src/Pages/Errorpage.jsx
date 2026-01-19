import { useNavigate } from "react-router";

const Errorpage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-menu ">
      <h1 className="text-[160px] font-extrabold text-red-500  text-shadow-black">
        404
      </h1>
      <p className=" text-lg md:text-2xl text-gray-700 text-center">
        Ooops!!! The page you are looking for is not found
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-10 rounded-2xl border border-gray-300 bg-search cursor-pointer px-8 py-4  text-lg font-semibold text-gray-800 shadow-lg hover:shadow-2xl hover:translate-y-[2px] transition-all"
      >
        BACK TO HOME
      </button>
    </div>
  );
}



export default Errorpage