import React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react'
import { func, shape } from 'prop-types'
import { QuestionIcon } from '@chakra-ui/icons'

function image(show) {
  if (show.image) {
    return (
      <Image
        h="100%"
        src={show.image.medium}
        alt={show.name}
        borderRadius="8px"
        ml="5"
      />
    )
  }
  return (
    <Flex h="100%" w="270px" bg="gray.400" borderRadius="8px" ml="5">
      <QuestionIcon color="white" boxSize="8" margin="auto" />
    </Flex>
  )
}

export default function Show({ showInfo, handleShowClick }) {
  const { show } = showInfo

  const cleanSummary = (str) => {
    const temp = document.createElement('div')
    temp.innerHTML = str
    return temp.textContent || temp.innerText
  }

  const summary = cleanSummary(show.summary)

  const handleClick = () => {
    handleShowClick(show)
  }

  return (
    <Flex
      h="15em"
      w="100%"
      pos="relative"
      onClick={handleClick}
      cursor="pointer"
    >
      <Flex
        bgColor="brand.shade"
        h="80%"
        w="100%"
        pos="absolute"
        top="20px"
        borderRadius="8px"
      />
      <HStack pos="absolute" h="100%">
        {image(show)}
        <VStack alignItems="flex-start" h="100%" pl="20px" pt="40px">
          <Heading size="md">{show.name}</Heading>
          <Box fontSize="12px" maxWidth="900px" overflow="hidden" h="89px">
            {summary}
          </Box>
          <Button size="sm">Show Episodes</Button>
        </VStack>
      </HStack>
    </Flex>
  )
}

Show.propTypes = {
  showInfo: shape({}).isRequired,
  handleShowClick: func.isRequired,
}
