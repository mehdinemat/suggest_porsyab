import { Avatar, Box, Button, Card, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { IoPencil } from "react-icons/io5"

const MiniHeader = ({ handleClickProfile, handleClickFollower, handleClickFollowing, dataMe }) => {
  return (
    <Card bgColor={'#006A71'} height={'129px'} width={'100%'} borderRadius={'10px'} position={'relative'} cursor={'pointer'} mt={'80px'} alignItems={'start'} padding={'12px'}>
      <HStack w={'100%'}>
        <Box border={'5px solid #F9C96D'} borderRadius={'100%'}
          boxShadow="0px 0px 133.2px 2px #F9C96D" as={Box} justifyContent={'start'}
        >
          <Avatar height={'90px'} width={'90px'} onClick={e => handleClickProfile()}
          />
        </Box>
        <VStack w={'100%'} justifyContent={'start'} mr={'10px'}>
          <VStack w={'100%'} alignItems={'start'} gap={0} mb={'15px'}>
            <Text color={'white'} fontSize={'15px'} fontWeight={'900'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.first_name || 'نامشخص'} {dataMe?.data?.[0]?.last_name}</Text>
            <Text fontWeight={'300'} fontSize={'10px'} color={'white'} onClick={e => handleClickProfile()} >{dataMe?.data?.[0]?.email || 'نامشخص'}</Text>
          </VStack>
          <HStack w={'100%'} alignItems={'start'} justifyContent={'space-between'}>
            <Button bgColor={'#19797F'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollower()} h={'32px'} borderRadius={'8px'}>دنبال کننده‌ها</Button>
            <Button bgColor={'#19797F'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollowing()} h={'32px'} borderRadius={'8px'}>دنبال شونده‌ها</Button>
          </HStack>
        </VStack>
        <HStack w={'100%'} justifyContent={'start'} alignItems={'start'} h={'100%'} position={'absolute'} right={'calc( 100% - 125px )'} top={'10px'}>
          <Button bg={'#F9C96D1A'} color={'#F9C96D'} variant={'outline'} borderRadius={'5px'} w={'62px'} h={'16px'} fontSize={'6px'} leftIcon={<Image src="/orange_star.png" w={'7px'} h={'7px'} />}>سطح مبتدی</Button>
          <IconButton icon={<IoPencil height={'16px'} width={'16px'} />} bgColor={'#19797F'} height={'16px'} width={'16px'} borderRadius={'5px'} />
        </HStack>
      </HStack>

    </Card>
  )
}

export default MiniHeader
