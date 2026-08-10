import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import {
  useActivateUserMutation,
  useRegisterUserMutation,
} from "../Features/ApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setModal, state: initialState = "login" }) => {
  const [userRegister] = useRegisterUserMutation();
  const navigate=useNavigate()
  const [userActive] = useActivateUserMutation();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [currentState, setCurrentState] = useState(initialState);
  const [step, setStep] = useState(1);
  const isLogin = currentState === "login";
  const [code, setCode] = useState("");
  const [currentActivation, setCurrentActivation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const changeRegisterHandler = (e) => {
    const { name, value } = e.target;

    setRegisterInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //register new user
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      setRegisterLoading(true);
      const result = await userRegister(registerInfo).unwrap();
      console.log(result.success)
      if (result.success==true) {
        setCurrentActivation(result.activationToken);
        toast.success(result.message);
        setRegisterLoading(false);
      }else if(result.success==false){
        toast.error(result.message)
        setRegisterInfo(false)
      }
    } catch (error) {
      setRegisterInfo(false)
    }
  };
  //activations
  const handleActivations = async(e) => {
    e.preventDefault();
    try {
      const result=await userActive({activation_code:code,activation_token:currentActivation})
     
     setRegisterLoading(false)
    //   if(result.data.success===true){
    //   toast.success(result.data.message)
    //   setCurrentState('login')
    //  }else{
    //   alert(result.data.message)
    //  }
    
    } catch (error) {}
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={() => setModal(false)}
    >
      <div
        className="bg-white w-full max-w-md p-6 sm:p-8 flex flex-col gap-6 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Part */}
        {step === 1 && (
          <>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isLogin
                    ? "Login to start your journey"
                    : "Sign up to access all features"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4 w-ful flex-col md:flex-row md:gap-2">
              <button
                type="button"
                className="flex-1 flex items-center justify-center md:gap-2 border border-gray-300 py-2.5 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition shadow-sm w-full"
              >
                <FcGoogle size={20} />
                <span>
                  {isLogin ? "Login with Google" : "Sign with Google"}
                </span>
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition shadow-sm w-full"
              >
                <FaGithub size={20} />
                <span>
                  {isLogin ? "Login with GitHub" : "Sign with GitHub"}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-1">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-400 uppercase">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Form Part */}
            <form onSubmit={registerHandler} className="flex flex-col gap-4">
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={registerInfo?.name||""}
                    onChange={changeRegisterHandler}
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={registerInfo?.email||""}
                  onChange={changeRegisterHandler}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={registerInfo?.password||""}
                  onChange={changeRegisterHandler}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4266c7] hover:bg-[#3553a7] text-white py-2.5 rounded-lg text-sm font-semibold transition mt-2 shadow-md"
              >
                {isLogin
                  ? "Login Now"
                  : registerLoading
                    ? "Registering..."
                    : "Register now"}
              </button>
            </form>

            {/* Footer Toggle (Login <-> Signup Switch) */}
            <div className="text-center text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setCurrentState(isLogin ? "signup" : "login")}
                className="text-[#4266c7] font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Header Part */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Enter Activation Code
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                We sent a 4-digit code to{" "}
                <span className="font-medium text-gray-700"></span>
              </p>
            </div>

            {/* Input & Form Part */}
            <form onSubmit={handleActivations} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  maxLength={4}
                  value={code||"0"}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="0000"
                  className="w-full px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] rounded-xl border border-gray-300 focus:border-[#4266c7] focus:ring-2 focus:ring-[#4266c7]/20 outline-none transition shadow-sm text-gray-800 placeholder:text-gray-300 placeholder:tracking-[0.5em]"
                />
              </div>

              <button
                type="submit"
                disabled={code.length !== 4}
                className="w-full bg-[#4266c7] hover:bg-[#3553a7] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-semibold transition shadow-md"
              >
                Activate Account
              </button>
            </form>

            {/* Resend Code Footer */}
            <div className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button
                type="button"
                className="text-[#4266c7] font-semibold hover:underline"
              >
                Resend
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
