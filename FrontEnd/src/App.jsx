import { useState } from 'react'
import React from "react";
import Navbar from "./components/Navbar"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import {Button, Box, useColorModeValue} from "@chakra-ui/react"
import {Route, Routes} from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
            </Routes>

        </Box>
    </>
  )
}

export default App
