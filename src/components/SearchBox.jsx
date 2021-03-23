/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Flex, HStack, Input, VStack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import searchShows from '../api/search-shows'
import ShowList from './ShowList'

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [apiError, setApiError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (val) => {
    setSearchTerm(val.target.value)
  }

  const doSearch = async () => {
    try {
      const results = await searchShows(searchTerm)
      setSearchResults(results)
    } catch (error) {
      setApiError(error)
      setSearchTerm(null)
      setSearchResults([])
    }
  }

  return (
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
      {!!searchResults.length && <ShowList shows={searchResults} />}
    </VStack>
  )
}
