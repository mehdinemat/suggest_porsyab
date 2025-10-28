

import { Box, Card, Divider, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react"

const CommentCard = ({ titleFontSize = '14px', fontSize = '14px', dateFontSize = '14px' }) => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={2} height={'170px'} w={'100%'} boxShadow="
    0px 6px 14px 0px #0000000D,
    0px 25px 25px 0px #0000000A,
    0px 57px 34px 0px #00000008,
    0px 101px 40px 0px #00000003,
    0px 158px 44px 0px #00000000
  " borderRadius={'15px'} borderBottomRightRadius={'5px'} overflow={'hidden'}>
      <GridItem colSpan={4} height={'100%'}>

        <Card as={VStack} height={'100%'} w={'100%'} bgColor={'white'} variant={'unstyled'} flexShrink={0} gap={0} padding={'10px'} >
          <HStack w={'100%'} alignItems={'start'} >
            <VStack w={'100%'} alignItems={'start'}>
              <Box display={'flex'} height={'38px'} bgColor={'#F3F3F3'} w={'100%'} alignItems={'center'} p={'8px'} position={'relative'} pr={'10px'} borderRadius={'5px'}>
                <Box bgColor={'#3646B3'} height={'90%'} w={'3px'} position={'absolute'} zIndex={'9999'} borderTopRightRadius={'10px'} borderBottomRightRadius={'10px'} right={'1px'} />
                <Text fontSize={titleFontSize}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>
              </Box>
              <Text fontWeight={'400'} fontSize={'14px'}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟  داد؟</Text>
              <HStack w={'100%'} justifyContent={'end'}>


              </HStack>
              <Divider my={'5px'} />
            </VStack>
          </HStack>
          <HStack w={'100%'} alignItems={'start'} justifyContent={'space-between'}>
            <HStack w={'100%'}>
              <HStack gap={'30px'} color={'#3646B3'}>
                <HStack gap={'5px'} alignItems={'center'} justifyContent={'center'}>

                  <Text fontWeight={'600'} fontSize={'12px'} fontSize={dateFontSize}>3</Text>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.34424 5.99002C9.00049 7.86502 7.70455 9.63052 5.88612 10.025C4.99923 10.2177 4.07924 10.1002 3.25712 9.68932C2.435 9.27841 1.75267 8.59503 1.30729 7.73647C0.861912 6.87791 0.676184 5.88794 0.776553 4.90753C0.876922 3.92712 1.25827 3.00624 1.8663 2.27602C3.11343 0.777525 5.21924 0.365025 6.93799 1.11502" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.50049 5.24023L5.21924 7.11523L9.34424 2.24023" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </HStack>
                <HStack gap={'2px'}>
                  <Text fontWeight={'600'} fontSize={'12px'} fontSize={dateFontSize} >4</Text>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_515_4815)">
                      <path d="M4.5 4.5L7.6875 7.6875" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M7.6875 4.5L4.5 7.6875" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="6" cy="6" r="4.45" stroke="#3646B3" stroke-width="1.6" />
                    </g>
                    <defs>
                      <clipPath id="clip0_515_4815">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </HStack>
              </HStack>
            </HStack>
            <HStack w={'100%'} justifyContent={'end'}>
              <Text fontWeight={'500'} fontSize={dateFontSize} color={'#3646B3'}>1404/4/1</Text>
              <Text fontWeight={'500'} fontSize={dateFontSize} color={'#3646B3'}>15:30</Text>
            </HStack>
          </HStack>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default CommentCard
