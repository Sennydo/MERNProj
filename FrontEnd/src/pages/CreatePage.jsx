import React from "react";
import {useState} from "react";
import {Button, Container, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import {Box, Input} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";

const CreatePage = () => {

    const [newProduct, setNewProduct] = React.useState({
        name: "",
        price: "",
        image: "",
    });

    const toast = useToast();

    const {createProduct} = useProductStore()

    const handleAddProduct = async () => {
        console.log(newProduct);
        const {success, message} = await createProduct(newProduct);
        console.log("Success: ", success);
        console.log("Message: ", message);
        if (!success) {
            toast({
                title: "Error!",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success!",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
        setNewProduct({name:"", price:"",image:"",});
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={5}>
                <h1>Create New Product</h1>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"} >

                    <VStack spacing={4}>
                        <Input placeholder={"Name of your Product"} name={"name"} value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>

                        <Input placeholder={"Enter Price"} name={"price"} value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>

                        <Input placeholder={"Image URL"} name={"image"} value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>

                        <Button colorScheme={"cyan"} w={"full"} onClick={handleAddProduct}>
                            Add New Product
                        </Button>

                    </VStack>

                </Box>
            </VStack>

        </Container>
    )
}


export default CreatePage;