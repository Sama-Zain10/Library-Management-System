import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Joi from "joi";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { AuthContext } from "../Components/Shared/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    role: "MEMBER",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Validation schema
  const schema = Joi.object({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
    rePassword: Joi.any().valid(Joi.ref("password")).required(),
    phone: Joi.string().min(10).required(),
    role: Joi.string().valid("MEMBER", "LIBRARIAN").required(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrorMessage("");

    if (name !== "rePassword") {
      const subSchema = Joi.object({ [name]: schema.extract(name) });
      const { error } = subSchema.validate({ [name]: value });
      setFieldErrors((prev) => ({
        ...prev,
        [name]: error ? error.details[0].message : null,
      }));
    }

    if (name === "password" || name === "rePassword") {
      setFieldErrors((prev) => ({
        ...prev,
        rePassword:
          newFormData.rePassword &&
          newFormData.rePassword !== newFormData.password
            ? "Passwords do not match"
            : null,
      }));
    }
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

    const payload = {
      fullName: formData.fullName,
      username: formData.email,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
    };

    try {
      const response = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      navigate("/login");
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
          <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
          {errorMessage && (
            <p className="text-red-500 text-center mb-2">{errorMessage}</p>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="p-3 border rounded-lg w-full"
              value={formData.fullName}
              onChange={handleChange}
            />
            {fieldErrors.fullName && (
              <p className="text-red-500 text-sm">{fieldErrors.fullName}</p>
            )}

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

            <div className="flex gap-2">
              <div className="relative w-1/2">
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

              <div className="relative w-1/2">
                <input
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  placeholder="Re-enter Password"
                  className="p-3 border rounded-lg w-full pr-10"
                  value={formData.rePassword}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                >
                  {showRePassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
                </span>
              </div>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-sm">{fieldErrors.password}</p>
            )}
            {fieldErrors.rePassword && (
              <p className="text-red-500 text-sm">{fieldErrors.rePassword}</p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="p-3 border rounded-lg w-full"
              value={formData.phone}
              onChange={handleChange}
            />
            {fieldErrors.phone && (
              <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
            )}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            >
              <option value="MEMBER">Member</option>
              <option value="LIBRARIAN">Librarian</option>

            </select>
            {fieldErrors.role && (
              <p className="text-red-500 text-sm">{fieldErrors.role}</p>
            )}

            <button
              type="submit"
              className="bg-amber-900 text-amber-50 cursor-pointer font-semibold p-3 rounded-xl w-full hover:scale-105 transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <NavLink to="/login" className="text-amber-800 hover:underline">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
