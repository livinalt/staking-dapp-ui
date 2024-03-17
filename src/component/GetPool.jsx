import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import {useState} from 'react'
import handleGetPool from '../hooks/handleGetPool';

const GetPool = () => {
    const [poolId, setPoolID] = useState("")
  return (
    <div className="">
    <div className="">
      <Text className='pr-8'>Search For Pools using ID</Text>
      <Flex justify={'between'} align="center">
        <Text as="div" size="2" mb="1" weight="bold">
          Pool
        </Text>
        <TextField.Input
          value={poolId}
          placeholder="Enter the Pool ID"
          onChange={(e) => setPoolID(e.target.value)}
        />
        <Button className="bg-blue-600"
        onClick={handleGetPool}
        >Get Pool</Button>
      
      </Flex>
    </div>
    <hr />
  </div>
  
  )
}

export default GetPool