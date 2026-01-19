import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Joi from "joi";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { AuthContext } from "../Components/Shared/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken, setUser } = useContext(AuthContext);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
    const subSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = subSchema.validate({ [name]: value });
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error ? error.details[0].message : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => (newErrors[err.path[0]] = err.message));
      setFieldErrors(newErrors);
      setErrorMessage("⚠️ Please fix the errors below.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Invalid email or password");
      // const data = await response.json();
      // localStorage.setItem("token", data.token);
      // setToken(data.token);
      // بعد تسجيل الدخول أو التسجيل
const data = await response.json();

// البيانات اللي بيرجعها السيرفر لازم تحتوي على fullName, email, phone, role
const userData = {
  fullName: data.fullName,
  email: data.email,
  phone: data.phone,   // مهم جداً
  role: data.role,     // مهم جداً
  id: data.id
};

localStorage.setItem("user", JSON.stringify(userData));
setUser(userData);
setToken(data.token);


      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div
      className="top-0 w-full h-screen flex items-center justify-center absolute"
      style={{
        backgroundImage: "url('/library-background-wz960wpmas31buy9.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-amber-50 p-10 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
          {errorMessage && (
            <p className="text-red-500 text-center mb-2">{errorMessage}</p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border rounded-lg w-full"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="p-3 border rounded-lg w-full pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
              </span>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-sm">{fieldErrors.password}</p>
            )}

            <button
              type="submit"
              className="bg-amber-900 text-white font-semibold py-2 rounded-xl w-full hover:bg-amber-800 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-amber-800 hover:underline">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
