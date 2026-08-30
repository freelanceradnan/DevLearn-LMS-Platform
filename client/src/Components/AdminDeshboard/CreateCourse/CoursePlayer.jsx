import React, { useEffect, useState } from 'react';
import axios from 'axios'

const CoursePlayer = ({videoUrl}) => {
const [videoData,setVideoData]=useState({
    otp:"",
    playbackInfo:""
})
useEffect(()=>{
axios.post(`${import.meta.env.VITE_BASE_SERVER}/generateUrl`,{
videoId:videoUrl
}).then((res)=>{
    setVideoData(res.data)
})
},[videoUrl])
return (
        <div className='w-full'>
        {videoData?.otp && videoData?.playbackInfo!=="" &&(
            <iframe
  src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=n5kZLQsKT6mXju2p`}
  className='border-0 w-[720px] h-[405px]'
  allow="encrypted-media"
  allowFullScreen
></iframe>
        )}
            <h2>CoursePlayer</h2>
        </div>
    );
};

export default CoursePlayer;