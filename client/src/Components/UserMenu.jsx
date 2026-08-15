import { BookOpen, FileClock, Headset, Heart, LogOut, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({logout}) => {
  const MenuOtions = [
    { name: "My Learning", to: "/Courses",icons:<BookOpen size={16}/>},
    { name: "My Cart", to: "/cart",icons:<ShoppingCart size={16}/>},
    { name: "My WishList", to: "/withlist",icons:<Heart size={16}/>},
    { name: "Purchase History", to: "/purchasehistory",icons:<FileClock size={16}/>},
    { name: "Help and Support", to: "/support",icons:<Headset size={16}/>},
  ];
  return (
    <div className="flex flex-col gap-2.5 items-start">
      {MenuOtions.map((items,index) => (
        <Link key={index} className="hover:bg-[#f0f6ff] w-full py-1 text-sm px-1 flex gap-2 items-center text-[#676a83]" to={items.to}>
           <span> {items.icons}</span>
            {items.name}</Link>
      ))}
      <button className="hover:bg-[#f0f6ff] py-1 text-sm px-1 w-full text-left text-[#8184a0] flex gap-2.5 items-center" onClick={()=>logout()}><LogOut size={16} />Logout
      </button>
    </div>
  );
};

export default UserMenu;
