import { Box, Button, HStack, IconButton, Select, Text, Textarea, VStack } from "@chakra-ui/react"
import { GoPencil } from "react-icons/go"
import { IoArrowBack, IoClose } from "react-icons/io5"

const AnswerEdit = () => {
  return (
    <VStack w={'100%'} alignItems={'start'} justifyContent={'space-between'} height={'100%'}>
      <VStack w={'100%'} alignItems={'start'}>
        <HStack color={'#006A71'} w={'100%'} alignItems={'center'} justifyContent={'start'} gap={0} fontWeight={'600'} fontSize={'16px'}>
          <IconButton icon={<GoPencil />} variant={'ghost'} />
          <Text >ویرایش پاسخ</Text>
        </HStack>
        <Box bgColor={'#F3F3F3'} p={'10px'} borderRadius={'5px'} position={'relative'}>
          <Box bgColor={'#006A71'} height={'100%'} w={'4px'}
            position={'absolute'} top={'0px'} borderTopRightRadius={'5px'} borderBottomRightRadius={'5px'} right={'0px'} />
          <Text color={'#333333'} fontWeight={'500'} fontSize={'14px'}>آیا می‌توان نذر کرد که فطریه را به زلزله زده‌گان داد؟ اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را یک آیا می‌توان نذر ...</Text>
        </Box>
        <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >متن پاسخ</Text>
        <Textarea bgColor={'#F3F3F3'} />
        <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >انتخاب مراجع</Text>
        <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
        <Text color={'#979797'} fontWeight={'800'} fontSize={'18px'} mt={'24px'} >انتخاب واژگان کلیدی</Text>
        <Select bgColor={'#F3F3F3'} height={'40px'} width={'100%'} mt={'27px'}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </VStack>
      <VStack w={'100%'}>
        <Button bgColor={'#006A71'} fontWeight={'800'} fontSize={'14px'} mt={'24px'} leftIcon={<IoArrowBack />} w={'100%'} height={'49px'}>ثبت و ادامه</Button>
        <Button color={'#FF0000'} fontWeight={'800'} fontSize={'14px'} mt={'8px'} leftIcon={<IoClose />} w={'100%'} variant={'ghost'}>حذف این سوال</Button>
      </VStack>
    </VStack>
  )
}

export default AnswerEdit
