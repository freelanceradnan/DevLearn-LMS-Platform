import { User,ShieldQuestionMark, MessageSquareMore, MessageCircle, ShoppingCart} from "lucide-react";
import React from "react";

const Notification = () => {
  const notification = [
    { title: "Adnan created Account",icon:<User/>},
    { title: "Zenon Purchase Course",icon:<ShoppingCart /> },
    { title: "New Mentor Request Pending",icon:<ShieldQuestionMark />},
    { title: "Shaharia Comments on web..." ,icon:<MessageCircle />},
    { title: "New Review Added Al/ML ..." ,icon:<MessageSquareMore />},
  ];
  return (
    <div>
        {notification.map((item)=>(
            <div>{item.title}</div>
        ))}
    </div>
  )
};

export default Notification;
