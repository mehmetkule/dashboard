import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification2Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    // <TooltipComponent content={"title"} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
    >
      <span
        style={{ backgroundColor: dotColor }}
        className="absolute inline-flex roundend-full h-2  w-2  right-2  top-2 "
      />
        {icon}
     
    </button>
    // </TooltipComponent>
  );
};

const Navbar = () => {
  const { activeMenu, setActiveMenu,isClick,setIsclick,handleClick,screenSize,setScreenSize } = useStateContext();
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => {
          setActiveMenu((prevActiveMenu) => !prevActiveMenu);
        }}
        color="blue"
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => {
            setActiveMenu(() => handleClick("cart"));
          }}
          color="blue"
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          customFunc={() => {
            setActiveMenu(() => handleClick("chat"));
          }}
          dotColor="#03C9D7"
          color="blue"
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          customFunc={() => {
            setActiveMenu(() => handleClick("notification"));
          }}
          dotColor="#03C9D7"
          color="blue"
          icon={<RiNotification2Line />}
        />
        {/*  <TooltipComponent content="Profile" position="BottomCenter"> */}
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
        onClick={() => handleClick("userProfile")}
        >
          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{''}
            <span className="text-gray-400 font-bold ml-1 text-14">Michael</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
        {/*  </TooltipComponent> */}
        {isClick.cart && <Cart />}
        {isClick.chat && <Chat />}
        {isClick.userProfile && <UserProfile />}
        {isClick.notification && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
