import { Globe, MessageCircle, User, Users, Video, Globe2, MessageSquare, HeartHandshake, FolderGit2 } from 'lucide-react';
import React from 'react';
import { assets } from '../assets/assets';

const Community = () => {
    const Images = [
        { url: assets.c1, bg: "#C1F1CA" },
        { url: assets.c2, bg: "#FEDCAC" },
        { url: assets.c3, bg: "#FF9B9C" },
        { url:assets.c4, bg: "#FDBFAD" },
        { url: assets.c5, bg: "#E8DE99" },
        { url: assets.c6, bg: "#C1F1CA" },
        { url: assets.c7, bg: "#FF9B9C" },
        { url: assets.c8, bg: "#FDBFAD" },
        { url: assets.c9, bg: "#FEDCAC" }
    ];

    const CommunityItems = [
        { name: "Study Groups", description: "Connect with like-minded learners and form study groups for collaborative learning.", icon: <Users size={18} /> },
        { name: "Live Sessions", description: "Participate in interactive live Q&A and workshops with expert instructors.", icon: <Video size={18} /> },
        { name: "Global Community", description: "Interact with peers from over 150+ countries around the world.", icon: <Globe2 size={18} /> },
        { name: "Discussion Forums", description: "Share insights, ask questions, and solve coding challenges together.", icon: <MessageSquare size={18} /> },
        { name: "Peer Support", description: "Give and receive mentorship to stay motivated throughout your journey.", icon: <HeartHandshake size={18} /> },
        { name: "Project Collaboration", description: "Build real-world portfolios together by collaborating on team projects.", icon: <FolderGit2 size={18} /> }
    ];

    return (
        <section className='w-full bg-gradient-to-br from-emerald-50/60 via-white to-green-50/40 py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
                
                {/* Left Content Section */}
                <div className='w-full lg:w-[55%] flex flex-col gap-8'>
                    <div className='flex flex-col gap-3'>
                        <span className='inline-block w-fit px-3 py-1 bg-emerald-100 text-[#09C82C] text-xs font-bold uppercase tracking-wider rounded-full'>
                            Community
                        </span>
                        <h2 className='text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight'>
                            Join Our Thriving <span className='text-[#09C82C]'>Learning Community</span>
                        </h2>
                        <p className='text-[#64748b] text-base sm:text-lg max-w-[580px] leading-relaxed'>
                            Learning is better together. Join our community of 50,000+ students and unlock collaborative features that accelerate your growth.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        {CommunityItems.map((item, index) => (
                            <div key={index} className='flex items-start gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-white hover:shadow-md'>
                                <div className='shrink-0 bg-[#d3f5d8] rounded-xl p-2.5 text-[#09C82C] shadow-sm'>
                                    {item.icon}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='text-base font-semibold text-[#171717]'>{item.name}</h3>
                                    <p className='text-xs sm:text-sm text-slate-500 leading-relaxed'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div>
                        <button className='px-6 py-3.5 bg-[#09C82C] hover:bg-[#07b027] active:scale-95 transition-all duration-200 rounded-full text-base text-white font-semibold shadow-lg shadow-emerald-500/25'>
                            Join Community
                        </button>
                    </div>
                </div>

                {/* Right Visual/Avatars Section */}
                <div className='w-full lg:w-[45%] flex justify-center items-center py-8'>
                    <div className='bg-white w-full max-w-md border border-gray-100 rounded-3xl shadow-2xl p-6 sm:p-8 relative'>
                        
                        {/* Top Floating Badge */}
                        <div className='absolute -top-6 right-6 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-3 flex gap-3 items-center rounded-2xl shadow-xl border border-gray-100 animate-bounce-slow'>
                            <div className='p-2 bg-emerald-50 text-[#09C82C] rounded-xl'>
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <p className='text-xs sm:text-sm font-bold text-slate-800'>24/7 Support</p>
                                <p className='text-xs text-slate-400'>Always here</p>
                            </div>
                        </div>

                        {/* Bottom Floating Badge */}
                        <div className='absolute -bottom-6 left-6 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-3 flex gap-3 items-center rounded-2xl shadow-xl border border-gray-100'>
                            <div className='p-2 bg-blue-50 text-blue-600 rounded-xl'>
                                <Globe size={20} />
                            </div>
                            <div>
                                <p className='text-xs sm:text-sm font-bold text-slate-800'>150+ Countries</p>
                                <p className='text-xs text-slate-400'>Worldwide reach</p>
                            </div>
                        </div>

                        {/* Avatars Grid */}
                        <div className='grid grid-cols-3 gap-3 sm:gap-4 py-4 place-items-center'>
                            {Images.map((item, index) => (
                                <div 
                                    key={index} 
                                    className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1 shadow-md transition-transform duration-300 hover:scale-105'
                                    style={{ backgroundColor: item.bg }}
                                >
                                    <img 
                                        src={item.url} 
                                        alt={`Community Member ${index + 1}`} 
                                        className='w-full h-full object-cover rounded-xl' 
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Community;