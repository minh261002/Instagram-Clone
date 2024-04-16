import { Flex, Avatar, Text } from "@chakra-ui/react"

const Comment = ({ created_at, username, profilePic, content }) => {
    return (
        <Flex gap={4}>
            <Avatar src={profilePic} size={'sm'} />

            <Flex direction={'column'}>
                <Flex gap={2}>
                    <Text fontSize={12} fontWeight={'bold'}>
                        {username}
                    </Text>

                    <Text fontSize={14}>
                        {content}
                    </Text>
                </Flex>

                <Text fontSize={12} color={"gray"}>
                    {created_at}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Comment