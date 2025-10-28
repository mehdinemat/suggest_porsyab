import { Box, Button, Card, HStack, Image, Progress, Text, VStack } from "@chakra-ui/react"
import { IoChevronUp } from "react-icons/io5"

const scoreShadow = ` 
0px 1px 2px 0px #0000000D,
  0px 4px 4px 0px #0000000A,
    0px 9px 5px 0px #00000008,
      0px 15px 6px 0px #00000003,
        0px 24px 7px 0px #00000000
`

const Scores = ({ bgColor = '#F7F7F7', shadow = scoreShadow, subBgColor = 'white', color = 'black', showDetails = true, setShowDetails }) => {
  return (
    <Card as={VStack} height={'fit-content'} w={'100%'} variant={'unstyled'} flexShrink={0} gap={'10px'} padding={'10px'} borderRadius={'15px'} bgColor={bgColor} >
      <HStack w={'100%'} alignItems={'start'} height={'64px'} bgColor={subBgColor} padding={'10px'} borderRadius={'10px'} boxShadow={shadow}>
        <VStack w={'100%'} alignItems={'start'} onClick={e => setShowDetails(true)}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'10px'} color={color}>سطح کاربر</Text>
            <Button bgColor={'#6DF9F94D'} color={'#29CCCC'} h={'17px'} w={'63px'} fontSize={'6px'} leftIcon={<Image src="/start.png" h={'11px'} w={'11px'} />}>سطح عادی</Button>

          </HStack>
          <Box w={'100%'}>

            <Progress
              value={80}
              borderRadius="20px"
              sx={{
                "& > div": {
                  background: "linear-gradient(90deg, #6DF9F9 0%, #F9C96D 100%)",
                  borderRadius: "20px",
                },
              }}
            />

          </Box>
        </VStack>
      </HStack>
      {showDetails && <VStack w={'100%'}>
        <HStack w={'100%'} alignItems={'start'} bgColor={subBgColor} padding={'10px'} borderRadius={'10px'}>
          <VStack w={'100%'} alignItems={'start'}>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Text fontWeight={'bold'} fontSize={'10px'} color={color}>امتیاز سوالات</Text>
              <HStack>
                <Text color={'#29CCCC'}>3.2</Text>
                <Image src="/start.png" />
                <Image src="/start.png" />
                <Image src="/start.png" />
                <Image src="/start.png" />
              </HStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack w={'100%'} alignItems={'start'} bgColor={subBgColor} padding={'10px'} borderRadius={'10px'}>
          <VStack w={'100%'} alignItems={'start'}>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Text fontWeight={'bold'} fontSize={'10px'} color={color}>امتیاز پاسخ ها</Text>
              <HStack>
                <Text color={'#29CCCC'}>3.2</Text>
                <Image src="/start.png" />
                <Image src="/start.png" />
                <Image src="/start.png" />
                <Image src="/start.png" />
              </HStack>
            </HStack>
          </VStack>
        </HStack>
        <IoChevronUp color="white" fontSize={'25px'} onClick={e => setShowDetails(false)} />
      </VStack>}
    </Card >
  )
}

export default Scores
