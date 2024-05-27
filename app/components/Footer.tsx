import { Image, Square, Stack, Flex, Box } from '@chakra-ui/react';
import { MiddleFooter } from './MiddleFooter';

function Footer() {
  return (
    <Box as="footer">
      <MiddleFooter />
      <Flex py="5%" bg="black" color="gray.500" justify="space-around">
        <Stack direction={'row'} spacing={2}>
          <Square size={{ base: '60px', md: '100px' }}>
            <Image src="klarna.png" alt="klarna" />
          </Square>
          <Square size={{ base: '60px', md: '100px' }}>
            <Image src="visa.png" alt="visa" />
          </Square>
          <Square size={{ base: '60px', md: '100px' }}>
            <Image src="master.png" alt="mastercard" />
          </Square>
          <Square size={{ base: '60px', md: '100px' }}>
            <Image src="american.png" alt="american express" />
          </Square>
          <Square size={{ base: '60px', md: '100px' }}>
            <Image src="swish.png" alt="swish" />
          </Square>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Footer;
