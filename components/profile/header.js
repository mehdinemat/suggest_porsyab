import { Avatar, Box, Button, Card, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { IoPencil } from "react-icons/io5"
import Scores from "../dashboard/scores"

const Header = ({ handleClickProfile, handleClickFollower, handleClickFollowing, shadow, showDetails, setShowDetails, dataMe }) => {
  return (
    <Card
      bgColor={'#006A71'}
      width={'100%'}
      borderRadius={'10px'}
      position={'relative'}
      as={VStack}
      cursor={'pointer'}
      mt={'120px'}
      pb={'0px'}
    >
      <HStack w={'100%'} justifyContent={'space-between'}>
        <Button position={'absolute'} top={'10px'} right={'10px'} bg={'#F9C96D1A'} color={'#F9C96D'} variant={'outline'} borderRadius={'5px'} w={'70px'} h={'22px'} fontSize={'8px'} leftIcon={<Image src="/orange_star.png" w={'10px'} h={'10px'} />}>سطح مبتدی</Button>
        <IconButton icon={<IoPencil />} bgColor={'#19797F'} position={'absolute'} top={'10px'} left={'10px'} height={'25px'} width={'22px'} borderRadius={'5px'} />
      </HStack>
      <Box border={'5px solid #F9C96D'} borderRadius={'100%'}
        boxShadow="0px 0px 133.2px 2px #F9C96D" position={'absolute'} top={'-60px'}
      >
        <Avatar height={'109'} width={'109'} onClick={e => handleClickProfile()}
        />
      </Box>
      {/* <Image src="/start.png" position={'absolute'} top={'120px'} onClick={e => handleClickProfile()} /> */}
      <Text color={'white'} fontSize={'15px'} fontWeight={'900'} onClick={e => handleClickProfile()} mt={'60px'}>{dataMe?.data?.[0]?.first_name || 'نامشخص'} {dataMe?.data?.[0]?.last_name}</Text>
      <Text fontWeight={'300'} fontSize={'10px'} color={'white'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.email || 'نامشخص'}</Text>
      <HStack w={'100%'} padding={'10px'}>
        <Button bgColor={'#19797F'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollower()} h={'46px'} borderRadius={'8px'}>دنبال کننده‌ها</Button>
        <Button bgColor={'#19797F'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollowing()} h={'46px'} borderRadius={'8px'}>دنبال شونده‌ها</Button>
      </HStack>
      <Scores shadow={shadow} bgColor={'#006A71'} subBgColor={'#19797F'} color={'white'} showDetails={showDetails} setShowDetails={setShowDetails} />
    </Card>
  )
}

export default Header
