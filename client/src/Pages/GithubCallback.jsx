import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGithubAuthMutation } from '../Features/ApiSlice';


const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const [githubAccess]=useGithubAuthMutation()
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
     const githubapi=async()=>{
     try {
        const result=await  githubAccess(code).unwrap()
        
     } catch (error) {
        
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