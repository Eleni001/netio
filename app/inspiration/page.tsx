'use client';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import RoomCard from '../components/RoomCard';

function Inspiration() {
  return (
    <>
      <Flex flexDir="column" align="center">
        <Text fontSize="1.7rem" mt="3rem">
          Inspiration & Tips
        </Text>
        <Box
          position="relative"
          width="100%"
          h="50vh"
          mt="3rem"
          _after={{
            content: `""`,
            position: 'absolute',
            top: 0,
            left: 0,
            w: '100%',
            h: '100%',
            bg: 'rgba(0,0,0,0.2)',
          }}
          clipPath={{
            base: 'none',
            md: 'polygon(50% 0, 100% 10%, 100% 89%, 50% 100%, 0 90%, 0 10%)',
          }}
        >
          <Image
            src="https://images.pexels.com/photos/6758771/pexels-photo-6758771.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="inspiration image"
            objectFit="cover"
            width="100%"
            height="100%"
          />
          <Text
            position="absolute"
            fontSize={{ base: '1.8rem', md: '3rem' }}
            color="white"
            mt="3rem"
            top="42%"
            left="50%"
            transform="translate(-50%, -42%)"
            zIndex="1"
          >
            Explore. Dream. Create
          </Text>
        </Box>
        <Text fontSize="1.7rem" m="3rem auto" textAlign="center">
          Inspiration Room by Room
        </Text>
      </Flex>
      <Box bg="#FAF7F7" width="100%" p="2rem">
        <Flex
          justify="center"
          align="center"
          flexWrap="wrap"
          mt="3rem"
          gap="3rem"
        >
          <RoomCard
            src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=800"
            title="Livingroom"
          />
          <RoomCard
            src="https://images.pexels.com/photos/2398375/pexels-photo-2398375.jpeg?auto=compress&cs=tinysrgb&w=800"
            title="Kitchen"
          />
          <RoomCard
            src="https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg?auto=compress&cs=tinysrgb&w=800"
            title="Bathroom"
          />
          <RoomCard
            src="https://images.pexels.com/photos/90319/pexels-photo-90319.jpeg?auto=compress&cs=tinysrgb&w=800"
            title="Bedroom"
          />
        </Flex>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justify="space-evenly"
          height="150px"
          width="90%"
          m="1rem auto"
          gap={5}
        >
          <Box>
            <Text
              fontSize={{ base: '1.1rem', md: '2rem' }}
              textTransform="uppercase"
            >
              Summer Outdoor Living
            </Text>
            <Box h="3px" bg="#E4A757" width="50px" m="1rem 0" />
          </Box>
          <Box>
            <Text fontSize={{ base: '1.1rem', md: '1.3rem' }}>
              Outdoor sofas and dining sets to make the most of the summer
              season.
            </Text>
          </Box>
          <Box>
            <Button p="1.5rem 1rem" bg="#E4A757" _hover={{ bg: '#efdbc2' }}>
              Inspire Yourself{' '}
              <ArrowForwardIcon
                ml="1rem"
                fontSize="1.5rem"
                transition={'transform 0.2s ease-in-out'}
                _hover={{ transform: 'translateX(5px)' }}
              />
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Inspiration;
