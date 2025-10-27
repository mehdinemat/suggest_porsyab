import { Card, HStack, Text, VStack } from "@chakra-ui/react"
import { IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5"
import { TiInputChecked } from "react-icons/ti"

const MyQuestion = ({ item }) => {
  return (
    <Card as={VStack} w={'100%'} variant={'unstyled'} flexShrink={0} padding={'3px'} borderRadius={'15px'} bgColor={'#F7F7F7'} height={'88px'} >
      <HStack w={'100%'} alignItems={'start'} height={'88px'} bgColor={'white'} padding={'10px'} borderRadius={'10px'} boxShadow="
        0px 2px 5px 0px #0000000D,
        0px 9px 9px 0px #0000000A,
        0px 20px 12px 0px #00000008,
        0px 36px 14px 0px #00000003,
        0px 56px 16px 0px #00000000
      ">
        <VStack w={'100%'} alignItems={'start'} gap={0} justifyContent={'space-between'} height={'100%'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'} color={'#333333'}>{item?.content?.length > 150 ? `${item?.content?.slice(0, 150)}...` : item?.content}</Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <HStack w={'100%'}>
              <HStack gap={'14px'}>
                <HStack gap={'2px'}>
                  <TiInputChecked width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoEyeOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoChatbubbleEllipsesOutline width={'10px'} height={'10px'} color="#C2C2C2" />
                  <Text fontWeight={'600'} fontSize={'7px'} color={'#C2C2C2'}>3 پسند</Text>
                </HStack>
              </HStack>
            </HStack>
            <HStack w={'100%'} justifyContent={'end'} color={'#999999'} fontSize={'8px'}>
              <Text>1404/01/27</Text>
              <Text>13:50</Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>

    </Card>
  )
}

export default MyQuestion
