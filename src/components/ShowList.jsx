import React from 'react'
import { arrayOf, func, shape } from 'prop-types'
import { VStack } from '@chakra-ui/react'
import Show from './Show'

export default function ShowList({ shows, handleShowClick }) {
  return (
    <VStack w="100%" spacing="20px">
      {shows.map((show) => (
        <Show showInfo={show} key={show.id} handleShowClick={handleShowClick} /> // apparently show.id is not always unique
      ))}
    </VStack>
  )
}

ShowList.propTypes = {
  shows: arrayOf(shape({})).isRequired,
  handleShowClick: func.isRequired,
}
