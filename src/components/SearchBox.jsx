/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import {
  Button,
  Flex,
  HStack,
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
import CoolButton from './CoolButton'

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

  const doSearch = async (term) => {
    try {
      setIsLoading(true)
      const results = await searchShows(term)
      setIsLoading(false)
      setSearchResults(results)
    } catch (error) {
      setIsLoading(false)
      setSearchTerm(null)
      setSearchResults([])
      doErrorToast()
    }
  }

  const onChange = (val) => {
    setSearchTerm(val.target.value)
    doSearch(val.target.value)
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
            <DebounceInput
              placeholder="Search show titles"
              onChange={onChange}
              minLength={2}
              debounceTimeout={1000}
            />
            {/* <Input placeholder="Search show titles" onChange={onChange} /> */}
          </Flex>
          <CoolButton variant="large" isLoading={isLoading} onClick={doSearch}>
            Search
          </CoolButton>
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
