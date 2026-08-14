import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGithubAuthMutation, useSocialAuthMutation } from '../Features/ApiSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../Features/AuthSlice';


const GitHubCallback = () => {
  const dispatch=useDispatch()
  const [githubUser]=useSocialAuthMutation()
  const [searchParams] = useSearchParams();
  const [githubAccess]=useGithubAuthMutation()
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
     const githubapi=async()=>{
     try {
        const result=await  githubAccess(code).unwrap()
       if(result.user){
       const githubLogin=await githubUser({githubDetails:result.user}).unwrap()
       dispatch(setUser(result.user))
       toast.success('login with github added')
       navigate('/')
       }
     } catch (error) {
         toast.error('login with github failed!')
     }
     }
     githubapi()
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Authenticating with GitHub...</h2>
    </div>
  );
};

export default GitHubCallback;