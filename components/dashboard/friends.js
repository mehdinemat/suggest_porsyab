import { Avatar, Button, Card, HStack, Image, Text, VStack } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import useSWRMutation from "swr/mutation"
import { baseUrl } from "../lib/api"

const patchRequest = (url, { arg: { id, ...data } }) => {
  return axios.patch(baseUrl + url + id);
}

const Friends = ({ item }) => {

  const { trigger: triggerFollow, isLoading: isLoadingFollow } = useSWRMutation(`user/client/flow-action/`, patchRequest)

  const router = useRouter()
  const handleClickFriend = () => {
    router.push('/dashboard/user/434')
  }

  const handleFollow = (id) => {
    triggerFollow({ id: id })
  }

  return (
    <Card as={VStack} w={'100%'} variant={'unstyled'} height={'64px'} flexShrink={0} padding={'3px'} borderRadius={'15px'} bgColor={'#F7F7F7'}>
      <HStack w={'100%'} alignItems={'start'} bgColor={'white'} padding={'10px'} borderRadius={'10px'} justifyContent={'space-between'} boxShadow="
        0px 1px 1px 0px #0000000D,
        0px 3px 3px 0px #0000000A,
        0px 6px 4px 0px #00000008,
        0px 11px 4px 0px #00000003,
        0px 17px 5px 0px #00000000
      ">
        <HStack>
          <Avatar height={'48px'} width={'48px'} />
          <VStack onClick={e => handleClickFriend()} cursor={'pointer'}>
            <HStack w={'100%'} alignItems={'center'}>
              <Image src="/start.png" w={'14px'} h={'13px'} />
              <Text>{item?.first_name} {item?.last_name}</Text>
            </HStack>
            {/* <Text>mohammadi@gmail.com</Text> */}
          </VStack>
        </HStack>
        <Button colorScheme="teal" variant={'outline'} onClick={e => handleFollow(item?.id)}>دنبال کردن</Button>
      </HStack>
    </Card>
  )
}

export default Friends
