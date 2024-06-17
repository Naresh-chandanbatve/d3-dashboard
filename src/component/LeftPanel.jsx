import { useState, useRef } from "react";
import { Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { PiChartBarFill } from "react-icons/pi";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import logo from '../assets/logo.png'

function LeftPanel() {
  return (
    <div className="fixed h-screen w-[18vw] ml-0 border-r-2">
      <img src={logo} height={50} width={50} className="m-7"/>
        <Flex bgColor={"#919eab1f"} className="flex justify-left items-center rounded-xl p-[16px] px-[22px] w-[85%] m-auto">
          <Avatar src="https://bit.ly/sage-adebayo" boxSize={9} />
          <Box ml="3">
            <Text fontWeight="bold" className="text-[#212b36] text-sm text-left">
              Segun Adebayo
            </Text>
          </Box>
        </Flex>
        <Flex bgColor={"#1877f214"} className="flex justify-left items-center rounded-xl h-fit px-[16px] py-2 w-[90%] m-auto mt-7">
          <PiChartBarFill size={25} fill="#1877f2" />
          <Box ml="3">
            <Text fontWeight="bold" className="text-[#1877f2] text-sm text-left">
            Dashboard
            </Text>
          </Box>
        </Flex>
        <Flex  className="flex justify-left items-center rounded-xl h-fit px-[16px] py-2 w-[90%] m-auto mt-2 hover:bg-[#919eab14]">
          <BiSolidUserRectangle size={25} fill="#637381" />
          <Box ml="3">
            <Text fontWeight="bold" className="text-[#637381] text-sm text-left">
            User
            </Text>
          </Box>
        </Flex>
        <Flex  className="flex justify-left items-center rounded-xl h-fit px-[16px] py-2 w-[90%] m-auto mt-2 hover:bg-[#919eab14]">
          <FaShoppingCart size={23} fill="#637381" />
          <Box ml="3">
            <Text fontWeight="bold" className="text-[#637381] text-sm text-left">
            Product
            </Text>
          </Box>
        </Flex>
        <Flex className="flex justify-left items-center rounded-xl h-fit px-[16px] py-2 w-[90%] m-auto mt-2 hover:bg-[#919eab14]">
          <BsShieldLockFill size={23} fill="#637381" />
          <Box ml="3">
            <Text fontWeight="bold" className="text-[#637381] text-sm text-left">
            Login
            </Text>
          </Box>
        </Flex>
    </div>
  );
}

export default LeftPanel;
