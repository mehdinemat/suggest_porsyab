import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react"
import SliderCommnet from "./sliderCommnet"

const CommentCard = ({ t }) => {
  return (
    <Box bgColor={'#F7F7F7'} padding={'19px'} w={'100%'} borderRadius={'30px'}>
      <SliderCommnet />
      <VStack w={"100%"} alignItems={"start"} mt={'40px'}>
        <Text
          fontWeight={"600"}
          fontSize={{ base: '16px', md: "22px" }}
          mb={"4px"}
          color={'#333333'}
        >
          دیدگاه خود را بنویسید
        </Text>
      </VStack>

      <HStack w={'100%'} gap={{ base: 'none', md: '8px' }} >
        <Input height={{ base: '35px', md: '61px' }} bgColor={'white'} placeholder="نوشتن متن..." borderRadius={'30px'}
        />
        <Button bgColor={'#006A71'} fontWeight={'500'} fontSize={{ base: '10px', md: '18px' }} w={'135px'} h={{ base: '35px', md: '61px' }} color={'white'} type="submit" borderRadius={'30px'}>
          ارسال دیدگاه
        </Button>
      </HStack>
    </Box>
  )
}

export default CommentCard
