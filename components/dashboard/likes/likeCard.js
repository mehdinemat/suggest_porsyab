import { Avatar, Badge, Button, Card, Divider, Grid, GridItem, HStack, Image, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { IoChatbubbleEllipsesOutline, IoEyeOutline } from "react-icons/io5";

const LikeCard = () => {

  const currentSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={{ base: '2px', md: 2 }} height={'fit-content'} w={'100%'} >
      <GridItem colSpan={{ base: 4, md: 3 }} height={'100%'} >
        <Card as={VStack} height={'100%'} w={'100%'} bgColor={'white'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'} borderRadius={'10px'} boxShadow="
    0px 1px 2px 0px #0000001A,
    0px 3px 3px 0px #00000017,
    0px 8px 5px 0px #0000000D,
    0px 14px 5px 0px #00000003,
    0px 21px 6px 0px #00000000
  ">
          <HStack w={'100%'} alignItems={'start'} >
            <Image src="/verify.png" h={'22px'} w={'22px'} />
            <VStack w={'100%'} alignItems={'start'}>
              <Text fontWeight={'400'} fontSize={{ base: '10px', md: '18px' }}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <HStack>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={{ base: '7px', md: '12px' }} padding={{ base: '2px', md: '5px' }} borderRadius={{ base: '3px', md: '5px' }} fontWeight={'300'} h={{ base: '16px', md: '30px' }}>خداشناسی</Badge>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={{ base: '7px', md: '12px' }} padding={{ base: '2px', md: '5px' }} borderRadius={{ base: '3px', md: '5px' }} fontWeight={'300'} h={{ base: '16px', md: '30px' }}>خداشناسی</Badge>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={{ base: '7px', md: '12px' }} padding={{ base: '2px', md: '5px' }} borderRadius={{ base: '3px', md: '5px' }} fontWeight={'300'} h={{ base: '16px', md: '30px' }}>خداشناسی</Badge>
                  <Badge bgColor={'#29CCCC2B'} color={'#16A6A6'} fontSize={{ base: '7px', md: '12px' }} padding={{ base: '2px', md: '5px' }} borderRadius={{ base: '3px', md: '5px' }} fontWeight={'300'} h={{ base: '16px', md: '30px' }}>خداشناسی</Badge>
                </HStack>
                <HStack alignItems={'center'}>
                  <Avatar height={{ base: '13px', md: '24px' }} width={{ base: '13px', md: '24px' }} />
                  <Text fontWeight={'400'} fontSize={{ base: '7px', md: '12px' }} color={'#999999'}>اسلام کوئست</Text>
                  <Divider orientation="vertical" />
                </HStack>
              </HStack>
              <HStack w={'100%'} justifyContent={'end'}>


              </HStack>
              <Divider my={'5px'} />
            </VStack>
          </HStack>
          <HStack w={'100%'} alignItems={'start'} pr={'30px'}>
            <HStack w={'100%'}>
              <Text fontWeight={'400'} fontSize={{ base: '6px', md: '14px' }} color={'#3646B3'}>1404/4/1</Text>
              <Text fontWeight={'400'} fontSize={{ base: '6px', md: '14px' }} color={'#3646B3'}>15:30</Text>

              {/* <Avatar height={'19px'} width={'19px'} />
                        <VStack gap={0} alignItems={'start'}>
                          <Text fontWeight={'800'} fontSize={'9px'}>محمد مهدی</Text>
                          <Text fontWeight={'200'} fontSize={'5px'}>mohamadi@gmail.com</Text>
                        </VStack> */}
            </HStack>
            <HStack>
              <HStack gap={'14px'} color={'#3646B3'}>
                <HStack gap={'2px'} >
                  <svg width={currentSize == 'base' ? "12" : "20"} height={currentSize == 'base' ? "12" : "20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.8125 10.9373C17.1875 14.0623 14.8313 17.0048 11.525 17.6623C9.91249 17.9834 8.23976 17.7876 6.745 17.1028C5.25024 16.418 4.00965 15.279 3.19987 13.848C2.39009 12.4171 2.0524 10.7672 2.23489 9.13316C2.41738 7.49914 3.11074 5.96434 4.21625 4.74731C6.48375 2.24981 10.3125 1.56231 13.4375 2.81231" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.1875 9.6875L10.3125 12.8125L17.8125 4.6875" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <Text fontWeight={'400'} fontSize={{ base: '6px', md: '12px' }} >3پسند</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoEyeOutline width={'10px'} height={'15px'} fontSize={{ base: '14px', md: '22px' }} />
                  <Text fontWeight={'400'} fontSize={{ base: '6px', md: '12px' }} >23بازدید</Text>
                </HStack>
                <HStack gap={'2px'}>
                  <IoChatbubbleEllipsesOutline width={'15px'} height={'10px'} fontSize={{ base: '14px', md: '22px' }} />
                  <Text fontWeight={'400'} fontSize={{ base: '6px', md: '12px' }} >6جواب</Text>
                </HStack>
              </HStack>
            </HStack>
          </HStack>
        </Card>
      </GridItem>
      <GridItem height={'100%'} colSpan={{ base: 4, md: 1 }}>
        <Card display={'flex'} flexDir={{ base: 'row', md: 'column' }} height={'fit-content'} w={'100%'} variant={'unstyled'} flexShrink={0} position={'relative'} bgColor={"#F3F3F3"}
          boxShadow="
    0px 1px 2px 0px #0000001A,
    0px 3px 3px 0px #00000017,
    0px 8px 5px 0px #0000000D,
    0px 14px 5px 0px #00000003,
    0px 21px 6px 0px #00000000
  ">
          <HStack w={'100%'} height={'100%'} justifyContent={'space-between'} bgColor={'white'} padding={{ base: '2px', md: '16px' }} pr={{ base: '6px', md: '16px' }} borderRadius={'10px'}>
            <HStack position={'relative'}>
              <Avatar height={{ base: '23px', md: '39px' }} width={{ base: '23px', md: '39px' }} />
              <VStack gap={0} w={'100%'} alignItems={'start'}>
                <HStack>
                  <Image src="/start.png" w={'17px'} h={'17px'} display={{ base: 'none', md: 'flex' }} />
                  <Text fontWeight={'600'} fontSize={{ base: '8px', md: '15px' }}>محمد محمدی</Text>
                </HStack>
                <Text fontWeight={'300'} fontSize={{ base: '4px', md: '10px' }}>mohammadi@gmail.com</Text>
              </VStack>
            </HStack>
          </HStack>
          <Button leftIcon={<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.75 5.75L5.75 10.75L0.75 5.75ZM0.75 5.75L5.75 0.75L0.75 5.75ZM0.75 5.75L9.5 5.75L0.75 5.75ZM14.0833 5.75L12 5.75L14.0833 5.75Z" fill="white" />
            <path d="M0.75 5.75L5.75 10.75M0.75 5.75L5.75 0.75M0.75 5.75L9.5 5.75M14.0833 5.75L12 5.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          } bgColor={'#29CCCC'} w={{ base: '123px', md: '100%' }} h={{ base: '27px', md: '39px' }} borderRadius={'10px'} fontSize={{ base: '10px', md: '12px' }} fontWeight={'400'} position={'absolute'} left={'0px'}>مشاهده فعالیت</Button>
        </Card>
      </GridItem>
    </Grid>

  )
}

export default LikeCard
