const { VStack, Avatar, HStack, Divider, Text, Button, Card } = require("@chakra-ui/react")

const AboutUsCard = () => {
  return (
    <VStack as={Card} w={'150px'} h={'211px'} borderRadius={'18px'} boxShadow=" 0px 3px 5.5px 0px #00000029"
    >
      <Avatar w={'100%'} h={'150px'} borderRadius={'inherit'} />
      <VStack padding={'5px'} gap={0}>
        <Text fontWeight={'bold'} fontSize={'13px'}>علی محمدی</Text>
        <Text fontSize={'10px'}>موسسه فرهنگی همتا</Text>
      </VStack>
    </VStack >
  )
}

export default AboutUsCard

