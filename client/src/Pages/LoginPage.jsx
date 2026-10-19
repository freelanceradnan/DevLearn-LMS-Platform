import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { useLoginAdminMutation } from "../Features/ApiSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../Features/AdminSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {
  const dispatch=useDispatch()
    const {admin}=useSelector((state)=>state.admin)
  const navigate=useNavigate()
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loginAdmin]=useLoginAdminMutation()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await loginAdmin(form).unwrap();
      console.log("Login Response:", res);
      if (res.success === true) {
        
       
        dispatch(setAdmin(res.data));
        navigate('/admin/dashboard', { replace: true });
        toast.success("Admin Login Success!");
      }
    } catch (err) {
     
      const errorMessage = err?.data?.message || err?.message || "Email and password mismatch";
      setError(errorMessage);
      toast.error(errorMessage); 
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
if (admin && location.pathname === '/login') {
      navigate('/admin', { replace: true });
    }
  }, [admin]);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2ADC49] shadow-lg shadow-[#2ADC49]/30">
            <ShieldCheck className="h-7 w-7 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-400">Login to access</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-2xl space-y-5"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#2ADC49] focus:ring-2 focus:ring-[#2ADC49]/30"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-[#2ADC49] focus:ring-2 focus:ring-[#2ADC49]/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label htmlFor="remember" className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 accent-[#2ADC49]"
              />
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2ADC49] py-2.5 font-semibold text-gray-900 transition hover:bg-[#22c43f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default AdminLogin;