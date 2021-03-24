import React, { useState } from 'react'
import {
  Button,
  Flex,
  HStack,
  Input,
  VStack,
  Spinner,
  useToast,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import searchShows from '../api/search-shows'
import ShowList from './ShowList'

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const toast = useToast()

  const doErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Error fetching list of shows',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const onChange = (val) => {
    setSearchTerm(val.target.value)
  }

  // just to demonstrate the loading appearance
  const onShowLoading = ({ target: { checked } }) => {
    setIsLoading(checked)
  }

  const handleShowClick = (showInfo) => {
    console.log('handleShowClick', showInfo)
    setModalShow(showInfo)
  }

  const modalClose = () => {
    setModalShow(null)
  }

  const doSearch = async () => {
    try {
      setIsLoading(true)
      const results = await searchShows(searchTerm)
      setIsLoading(false)
      setSearchResults(results)
    } catch (error) {
      setIsLoading(false)
      setSearchTerm(null)
      setSearchResults([])
      doErrorToast()
    }
  }

  return (
    <>
      <VStack width="100%">
        <HStack w="100%" justifyContent="center" mb="20px">
          <Flex
            alignItems="center"
            h="50px"
            w="70%"
            backgroundColor="brand.shade"
            borderRadius="8px"
          >
            <SearchIcon marginLeft="5" />
            <Input placeholder="Search show titles" onChange={onChange} />
          </Flex>
          <Button onClick={doSearch}>Search</Button>
        </HStack>
        {
          // controls to test isLoading and isApiError handling
          !searchResults.length && (
            <HStack spacing="20" margin="0">
              <Checkbox onChange={onShowLoading} size="sm">
                (Test loading spinner)
              </Checkbox>
              <Button
                variant="link"
                bg="white"
                size="sm"
                fontWeight="normal"
                onClick={doErrorToast}
              >
                (Test error)
              </Button>
            </HStack>
          )
        }
        {isLoading && <Spinner />}
        {!!searchResults.length && (
          <>
            <Box color="red">Click a show to see details</Box>
            <ShowList shows={searchResults} handleShowClick={handleShowClick} />
          </>
        )}
      </VStack>

      {/* Should be separate component */}
      <Modal isOpen={!!modalShow} onClose={modalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalShow?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>{modalShow?.summary}</Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
