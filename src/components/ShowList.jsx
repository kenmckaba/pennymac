import React from 'react'
import { arrayOf, shape } from 'prop-types'
import { VStack } from '@chakra-ui/react'
import Show from './Show'

export default function ShowList({ shows }) {
  return (
    <VStack w="100%" spacing="20px">
      {shows.map((show) => (
        <Show showInfo={show} key={show.id} />
      ))}
    </VStack>
  )
}

ShowList.propTypes = {
  shows: arrayOf(shape({})).isRequired,
}
