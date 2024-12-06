import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import _ from "lodash";

import { GlobalContext } from "../../contexts/GlobalContext";

import productApi from "../../api/product.api";
import cartAPI from "../../api/cart.api";

import sampleImage from "../../assets/images/sample.jpg";

const ProductDetail = () => {
  const toast = useToast();

  const { productID } = useContext(GlobalContext);

  const [isLoading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const getProductByID = async () => {
      if (productID) {
        const dataProduct = await productApi.getProductByID(productID);
        const categoryOfProduct = await productApi.getProductCategory(
          dataProduct?.category
        );
        setProduct(dataProduct);
        setProductCategory(categoryOfProduct);
        setLoading(false);
      }
    };

    getProductByID();
  }, [productID, setProduct, setProductCategory]);

  const handleAddCart = async () => {
    try {
      const payload = {
        product: product["product_id"],
        quantity: 1,
      };

      const data = await cartAPI.addProduct(payload);

      if (!_.isEmpty(data))
        toast({
          title: "Add Cart Successful!",
          status: "success",
          position: "top-right",
        });
    } catch (error) {
      toast({
        title: "Add Cart Fail!",
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <Box paddingX="5%" paddingY="50px">
      {isLoading ? (
        <Flex justifyContent="center">
          <Spinner size="xl" color="#3734a9" />
        </Flex>
      ) : (
        <>
          <Flex>
            <Box
              padding="8px"
              borderRadius="12px"
              overflow="hidden"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            >
              <Image
                src={
                  product?.images ? product?.images[0]?.image_url : sampleImage
                }
                width="100%"
                aspectRatio={1}
                objectFit="cover"
              />
            </Box>
            <Stack margin="25px" gap={3}>
              <Box>
                <Heading as="h3" size="lg" noOfLines={1}>
                  {product?.product_name}
                </Heading>
              </Box>

              <Flex>
                <Text fontSize="xl">
                  Brand: <Text as="b">{product.brand}</Text>
                </Text>
              </Flex>

              <Text
                as="b"
                fontSize="xl"
              >{`${product?.original_price} VND`}</Text>

              <Box>
                <Button
                  size="lg"
                  color="white"
                  backgroundColor="#3734a9"
                  _hover={{
                    backgroundColor: "#333190",
                  }}
                  onClick={handleAddCart}
                >
                  Add to cart
                </Button>
              </Box>
            </Stack>
          </Flex>
          <Box marginTop={5}>
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Brand</Td>
                    <Td>{product?.brand}</Td>
                  </Tr>
                  <Tr>
                    <Td>Category</Td>
                    <Td>
                      {!_.isEmpty(productCategory) &&
                        productCategory.map((category, index) => {
                          const categoryName = category.category_name;

                          if (productCategory[index + 1])
                            return `${categoryName}, `;

                          return categoryName;
                        })}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Stock</Td>
                    <Td>{product?.stock}</Td>
                  </Tr>
                  <Tr>
                    <Td>Description</Td>
                    <Td>{product?.["product_description"]}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
