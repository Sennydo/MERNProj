import React, {useEffect} from "react";
import {Container, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useProductStore} from "../store/product.js";
import ProductCard from "../components/ProductCard";


const HomePage = () => {

    const {fetchProducts, products} = useProductStore()
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log(products);

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    Current Products
                </Text>

                <SimpleGrid columns={{
                    base: 1,
                    md: 2,
                    lg:3
                }} spacing={10} width={'full'}>

                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </SimpleGrid>

                {products.length === 0 && (
                    <Text>
                        No products found {" "}
                        <Link to={"/create"}>
                            <Text as='span' color={'cyan.300'} _hover={{textDecoration:"underline"}}>
                                Create a new Product
                            </Text>
                        </Link>
                    </Text>
                )}

            </VStack>
        </Container>
    )
}

export default HomePage;