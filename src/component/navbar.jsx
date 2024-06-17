import { useState, useRef } from "react";
import { Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { PiChartBarFill } from "react-icons/pi";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import flag from '../assets/flag.png'
import { GrSearch } from "react-icons/gr";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 flex flex-row justify-between items-center mt-6 w-full backdrop-blur-lg">
        <GrSearch size={40} fill="#666666" className="mx-14 hover:bg-[#63728114] rounded-full p-3"/>
        <div className="flex justify-end items-center">
        <img src={flag} height={20} width={25} className="m-4" />
        <IoNotificationsSharp size={25} className=""/>
       <Avatar src="https://bit.ly/sage-adebayo" boxSize={9} content="center" className=" rounded-full mr-14 ml-4 object-cover object-position-top w-fit"/>
       </div>
    </div>
  );
}

export default Navbar;
