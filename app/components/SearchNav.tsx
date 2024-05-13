import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";

export default function SearchNav() {
  return (
    <Stack display={{ base: "none", md: "flex" }}>
      <InputGroup width='15rem'>
        <Input
          width='15rem'
          placeholder='Search...'
          p='8px'
          border={"1px solid #e1dcd6"}
          borderRadius='2rem'
        />
        <InputRightElement
          height='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          color='#9c9494'
          mr='1rem'
        >
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
