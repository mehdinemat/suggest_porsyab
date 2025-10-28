import { useUser } from "@/context/UserContext"
import { Avatar, Box, Button, Card, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CiBookmark } from "react-icons/ci"
import { IoIosArrowForward } from "react-icons/io"
import { IoPencil } from "react-icons/io5"
import useSWR from "swr"
import Activities from "../dashboard/activities"
import Bookmarks from "../dashboard/bookmarks"
import Friends from "../dashboard/friends"
import Scores from "../dashboard/scores"

const deepShadow = `
    0px 3px 7px 0px #0000000D,
    0px 13px 13px 0px #0000000A,
    0px 28px 17px 0px #00000008,
    0px 51px 20px 0px #00000003,
    0px 79px 22px 0px #00000000
  `;

const activity = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1512_19073)">
    <path d="M9.14296 0.571442H1.71439C1.41129 0.571442 1.1206 0.691849 0.906268 0.906177C0.691941 1.1205 0.571533 1.41119 0.571533 1.7143V14.2857C0.571533 14.5888 0.691941 14.8795 0.906268 15.0938C1.1206 15.3082 1.41129 15.4286 1.71439 15.4286H12.0001C12.3032 15.4286 12.5939 15.3082 12.8082 15.0938C13.0226 14.8795 13.143 14.5888 13.143 14.2857V9.14287M0.571533 12H13.143M4.0001 3.42858H6.28582M4.0001 6.28573H5.14296" stroke="#3646B3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.2789 8.57831L6.85034 9.19545L7.42177 5.72117L12.2561 0.909741C12.3623 0.802623 12.4887 0.717601 12.628 0.659579C12.7672 0.601558 12.9166 0.571686 13.0675 0.571686C13.2184 0.571686 13.3677 0.601558 13.507 0.659579C13.6463 0.717601 13.7727 0.802623 13.8789 0.909741L15.0903 2.12117C15.1975 2.22741 15.2825 2.35381 15.3405 2.49308C15.3985 2.63235 15.4284 2.78173 15.4284 2.9326C15.4284 3.08347 15.3985 3.23285 15.3405 3.37211C15.2825 3.51138 15.1975 3.63778 15.0903 3.74403L10.2789 8.57831Z" stroke="#3646B3" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_1512_19073">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
</svg>


const friends = <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.4375 14.875C7.4375 14.875 6.375 14.875 6.375 13.8125C6.375 12.75 7.4375 9.5625 11.6875 9.5625C15.9375 9.5625 17 12.75 17 13.8125C17 14.875 15.9375 14.875 15.9375 14.875H7.4375ZM11.6875 8.5C12.5329 8.5 13.3436 8.16418 13.9414 7.5664C14.5392 6.96863 14.875 6.15788 14.875 5.3125C14.875 4.46712 14.5392 3.65637 13.9414 3.0586C13.3436 2.46083 12.5329 2.125 11.6875 2.125C10.8421 2.125 10.0314 2.46083 9.4336 3.0586C8.83582 3.65637 8.5 4.46712 8.5 5.3125C8.5 6.15788 8.83582 6.96863 9.4336 7.5664C10.0314 8.16418 10.8421 8.5 11.6875 8.5ZM5.542 14.875C5.38456 14.5433 5.30601 14.1796 5.3125 13.8125C5.3125 12.3728 6.035 10.8906 7.3695 9.86C6.7035 9.65434 6.00947 9.55396 5.3125 9.5625C1.0625 9.5625 0 12.75 0 13.8125C0 14.875 1.0625 14.875 1.0625 14.875H5.542ZM4.78125 8.5C5.48573 8.5 6.16136 8.22015 6.6595 7.722C7.15765 7.22386 7.4375 6.54823 7.4375 5.84375C7.4375 5.13927 7.15765 4.46364 6.6595 3.9655C6.16136 3.46735 5.48573 3.1875 4.78125 3.1875C4.07677 3.1875 3.40114 3.46735 2.903 3.9655C2.40485 4.46364 2.125 5.13927 2.125 5.84375C2.125 6.54823 2.40485 7.22386 2.903 7.722C3.40114 8.22015 4.07677 8.5 4.78125 8.5Z" fill="#3646B3" />
</svg>

const saved = <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.75 3.6648C0.75 2.64462 0.75 2.13453 0.968 1.74468C1.15974 1.40191 1.46569 1.12323 1.842 0.948571C2.27 0.75 2.83 0.75 3.95 0.75H9.55C10.67 0.75 11.23 0.75 11.658 0.948571C12.0343 1.12323 12.3403 1.40191 12.532 1.74468C12.75 2.13453 12.75 2.64462 12.75 3.6648V15.784C12.75 16.2267 12.75 16.448 12.649 16.5692C12.6054 16.6219 12.5497 16.6653 12.4858 16.6964C12.4219 16.7276 12.3513 16.7457 12.279 16.7495C12.112 16.7586 11.91 16.6357 11.506 16.3906L6.75 13.5023L1.994 16.3897C1.59 16.6357 1.388 16.7586 1.22 16.7495C1.14784 16.7456 1.07748 16.7274 1.01377 16.6962C0.950068 16.6651 0.894535 16.6218 0.851 16.5692C0.75 16.448 0.75 16.2267 0.75 15.784V3.6648Z" stroke="#3646B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const shadow = ` 
        0px 1.1px 2.21px 0px #0000000D,
        0px 4.41px 4.41px 0px #0000000A,
        0px 9.93px 5.52px 0px #00000008,
        0px 16.55px 6.62px 0px #00000003,
        0px 26.47px 7.72px 0px #00000000
      `


const Profile = ({ dataSaved }) => {


  const [tab, setTab] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const { dataMe } = useUser()
  const { data: dataFollowers, isLoading: isLoadingFollowers } = useSWR(dataMe?.data?.[0]?.id && `user/client/follows/${dataMe?.data?.[0]?.id}?query_type=following`)

  const [activePage, setActivePage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setActivePage(router.asPath);
  }, [router]);

  const getLastPathSegment = (path) => {
    const segments = path.split("/").filter(Boolean);
    return _.last(segments);
  };

  const handleClickFollowing = () => {
    router.push(`/dashboard/followings`)
  }
  const handleClickFollower = () => {
    router.push(`/dashboard/followers`)
  }

  return (
    <>

      {!showAll ? <Card
        bgColor={'#3646B3'}
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
          <IconButton icon={<IoPencil />} bgColor={'#4A58BA'} position={'absolute'} top={'10px'} left={'10px'} height={'25px'} width={'22px'} borderRadius={'5px'} />
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
          <Button bgColor={'#4A58BA'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollower()} h={'46px'} borderRadius={'8px'}>دنبال کننده‌ها</Button>
          <Button bgColor={'#4A58BA'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollowing()} h={'46px'} borderRadius={'8px'}>دنبال شونده‌ها</Button>
        </HStack>
        <Scores shadow={shadow} bgColor={'#3646B3'} subBgColor={'#4A58BA'} color={'white'} showDetails={showDetails} setShowDetails={setShowDetails} />
      </Card>
        :
        <Card bgColor={'#3646B3'} height={'129px'} width={'100%'} borderRadius={'10px'} position={'relative'} cursor={'pointer'} mt={'80px'} alignItems={'start'} padding={'12px'}>
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
                <Button bgColor={'#4A58BA'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollower()} h={'32px'} borderRadius={'8px'}>دنبال کننده‌ها</Button>
                <Button bgColor={'#4A58BA'} fontSize={'10px'} w={'100%'} onClick={e => handleClickFollowing()} h={'32px'} borderRadius={'8px'}>دنبال شونده‌ها</Button>
              </HStack>
            </VStack>
            <HStack w={'100%'} justifyContent={'start'} alignItems={'start'} h={'100%'} position={'absolute'} right={'calc( 100% - 125px )'} top={'10px'}>
              <Button bg={'#F9C96D1A'} color={'#F9C96D'} variant={'outline'} borderRadius={'5px'} w={'62px'} h={'16px'} fontSize={'6px'} leftIcon={<Image src="/orange_star.png" w={'7px'} h={'7px'} />}>سطح مبتدی</Button>
              <IconButton icon={<IoPencil height={'16px'} width={'16px'} />} bgColor={'#4A58BA'} height={'16px'} width={'16px'} borderRadius={'5px'} />
            </HStack>
          </HStack>

        </Card>}


      <Box bgColor={'#F3F3F3'} h={'80px'} borderRadius={'15px'} mt={'10px'} as={HStack} justifyContent={'space-between'} p={'10px'}>
        <VStack bgColor={tab == 1 && '#EBEDF8'} boxShadow={tab == 1 && deepShadow} w={'100%'} h={'100%'} justifyContent={'center'} borderRadius={'10px'} onClick={e => setTab(1)}>
          {activity}
          <Text color={'#3646B3'} fontSize={'10px'} fontWeight={'700'}>فعالیت ها</Text>
        </VStack>
        <VStack w={'100%'} h={'100%'} justifyContent={'center'} onClick={e => setTab(2)} bgColor={tab == 2 && '#EBEDF8'} boxShadow={tab == 2 && deepShadow} borderRadius={'10px'}>
          {friends}
          <Text color={'#3646B3'} fontSize={'10px'} fontWeight={'700'}>دوستان من</Text>
        </VStack>
        <VStack w={'100%'} h={'100%'} justifyContent={'center'} onClick={e => setTab(3)} bgColor={tab == 3 && '#EBEDF8'} boxShadow={tab == 3 && deepShadow} borderRadius={'10px'}>
          {saved}
          <Text color={'#3646B3'} fontSize={'10px'} fontWeight={'700'}>ذخیره شده‌ها</Text>
        </VStack>
      </Box>
      {tab == 1 && <VStack colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'} mt={'10px'} mb={'90px'}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <HStack alignItems={'center'} fontSize={'20px'}>

            <Image src="/activity1.png" h={'34px'} w={'34px'} />
            <Text fontWeight={'bold'}>فعالیت ها</Text>
          </HStack>
          {/* <Text color={'#3646B3'} fontSize={'8px'} cursor={'pointer'} onClick={e => setShowAll(true)}>مشاهده کامل</Text> */}
        </HStack>
        <Box as={VStack} gap={'15px'} w={'100%'} transition="height 0.3s ease" height={'320px'} overflowY={'scroll'} mt={'25px'}>
          <Activities />

        </Box>
      </VStack>}
      {tab == 2 && <VStack colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'} mt={'10px'} mb={'90px'}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <HStack alignItems={'center'} fontSize={'20px'}>
            {showAll && <IoIosArrowForward color={'#3646B3'} onClick={e => setShowAll(false)} />}
            <Image src="/friends1.png" h={'34px'} w={'34px'} />
            <Text fontWeight={'bold'}>دوستان</Text>
          </HStack>
          <Text color={'#3646B3'} fontSize={'8px'} cursor={'pointer'} onClick={e => setShowAll(true)}>مشاهده کامل</Text>
        </HStack>
        <Box as={VStack} gap={'15px'} w={'100%'} transition="height 0.3s ease" height={'320px'} overflowY={'scroll'} mt={'25px'}>
          {
            dataFollowers?.data?.map((item) => (
              <Friends item={item} />
            ))
          }

        </Box>
      </VStack>}
      {tab == 3 && <VStack colSpan={1} bgColor={'#F7F7F7'} padding={'16px'} borderRadius={'15px'} mt={'10px'} mb={'90px'}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <HStack alignItems={'center'} fontSize={'20px'}>
            {showAll && <IoIosArrowForward color={'#3646B3'} onClick={e => setShowAll(false)} />}
            <CiBookmark />
            <Text fontWeight={'bold'}>ذخیره شده‌ ها</Text>
          </HStack>
          <Text color={'#3646B3'} fontSize={'8px'} cursor={'pointer'} onClick={e => setShowAll(true)}>مشاهده کامل</Text>
        </HStack>
        <Box as={VStack} gap={'15px'} w={'100%'} transition="height 0.3s ease" height={'320px'} overflowY={'scroll'} mt={'25px'}>
          {
            dataSaved?.data?.actions?.map((item) => (
              <Bookmarks item={item} />
            ))
          }

        </Box>
      </VStack>}
    </>
  )
}

export default Profile
