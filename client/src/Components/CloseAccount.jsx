import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteUserAccountMutation, useSentEmailOtpMutation, useVerifyOtpMutation, useVerifyPasswordMutation } from '../Features/ApiSlice';
import toast from 'react-hot-toast';
import { logoutUser } from '../Features/AuthSlice';
import { useNavigate } from 'react-router-dom';

const CloseAccount = () => {
    const [state, setState] = useState(1);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [currentPassword, SetCurrentPassword] = useState("");
    const [sentOtp] = useSentEmailOtpMutation();
    const user = useSelector((state) => state.auth.user);
    const [VerifyPassword] = useVerifyPasswordMutation();
    const [verifyCode] = useVerifyOtpMutation();
    const [deleteUser]=useDeleteUserAccountMutation()
    // OTP states
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    // Change OTP handler
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto-focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // OTP KeyDown (Backspace)
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Paste OTP handler
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        
        if (pasteData.length === 6 && !isNaN(pasteData)) {
            const newOtp = pasteData.split("");
            setOtp(newOtp);
            inputRefs.current[5].focus();
        }
    };

    const isSocialAccount = Boolean(user?.githubId || user?.googleId);

    const deleteAccountBtn = () => {
        setState(isSocialAccount ? 3 : 2);
    };

    const SentOtp = async () => {
        setState(4);
        try {
            const result = await sentOtp().unwrap();
            toast.success("OTP sent to your email!");
            
        } catch (error) {
            toast.error("Failed to send OTP. Try again.");
        }
    };

    const verifyPassword = async (e) => {
        e.preventDefault();
        if (!currentPassword) {
            toast.error("Please enter your password!");
            return;
        }

        try {
            const result = await VerifyPassword({ password: currentPassword }).unwrap();

            if (result.success) {
                toast.success('Password verified successfully!');
                setState(5);
            }
        } catch (error) {
            const errorMsg = error?.data?.message || 'Wrong password! Please try to forgot password.';
            SetCurrentPassword("");
            toast.error(errorMsg);
            setState(1);
        }
    };

    const VerifyOtp = async () => {
        try {
            const code = Array.isArray(otp) ? otp.join("") : otp;
            if (code.length < 6) {
                toast.error("Please enter 6 digit OTP!");
                return;
            }
            const result = await verifyCode({ otp: code }).unwrap();
            if (result.success === true) {
                toast.success("OTP verified successfully!");
                setOtp([])
                setState(5);
            }
        } catch (error) {
            toast.error("Wrong OTP! Please request a new one.");
             setOtp([])
            setState(1);
        }
    };
const DeleteAccountHandler=async()=>{
    try {
        const result=await deleteUser().unwrap()
        if(result.success==true){
        toast.success("User Deleted Success")
        dispatch(logoutUser())
        navigate('/')
        }
    } catch (error) {
        toast.error("Failed to delete user please try again!")
    }
}
    return (
        <div className="md:max-w-xl mx-auto md:px-6 space-y-6 w-full py-5 md:py-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Account Security Settings</h2>

            <div>
                {/* State 1 Danger Zone */}
                {state === 1 && (
                    <div className="space-y-4">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <p className="text-red-700 font-semibold uppercase text-sm">Danger Zone</p>
                            <p className="text-gray-600 text-sm mt-1">
                                Please remember if you delete your account, your database and all documents will be lost permanently.
                            </p>
                        </div>
                        <button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm" 
                            onClick={deleteAccountBtn}
                        >
                            Proceed to Delete Account
                        </button>
                    </div>
                )}

                {/* State 2: Password Verification */}
                {state === 2 && (
                    <form className="space-y-4" onSubmit={verifyPassword}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Enter Your Password
                            </label>
                            <input 
                                type="password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                onChange={(e) => SetCurrentPassword(e.target.value)} 
                                value={currentPassword}
                                placeholder="••••••••"
                            />
                        </div>
                        <button 
                            type='submit' 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
                        >
                            Verify Password
                        </button>
                    </form>
                )}

                {/* State 3: Request OTP for Social Accounts */}
                {state === 3 && (
                    <div className="space-y-4 text-center">
                        <p className="text-gray-600 text-sm">
                            Your account is linked with social login. We need to verify your email (<span className="font-semibold text-gray-800">{user?.email}</span>).
                        </p>
                        <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200" 
                            onClick={SentOtp}
                        >
                            Send OTP Code
                        </button>
                    </div>
                )}

                {/* State 4: Enter OTP */}
                {state === 4 && (
                    <div className="space-y-6 text-center">
                        <p className="text-sm text-gray-600">Enter the 6-digit code sent to your email.</p>
                        <div className="flex justify-center space-x-2" onPaste={handlePaste}>
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-11 h-11 text-center text-lg font-bold bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            ))}
                        </div>
                        <button 
                            type="button" 
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm" 
                            onClick={VerifyOtp}
                        >
                            Verify OTP & Proceed
                        </button>
                    </div>
                )}

                {/* State 5: Final Account Deletion */}
                {state === 5 && (
                    <div className="space-y-4 text-center">
                        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                            Verification Successful! You can now permanently delete your account.
                        </div>
                        <button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm"
                            onClick={DeleteAccountHandler}
                        >
                            Permanently Delete Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CloseAccount;