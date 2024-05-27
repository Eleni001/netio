import { Box, Image, Text } from '@chakra-ui/react';

interface CardProps {
  src: string;
  title: string;
}

export default function RoomCard({ src, title }: CardProps) {
  return (
    <Box
      flexDirection="column"
      position="relative"
      mb="5rem"
      transition={'transform 0.2s ease-in-out'}
      _hover={{
        cursor: 'pointer',
        transform: 'scale(1.05)',
      }}
    >
      <Image src={src} alt="" objectFit="cover" width="100%" height="200px" />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0,0,0,0.2)"
      />

      <Text
        position="absolute"
        fontSize="1.5rem"
        color="white"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontWeight="semibold"
        textTransform="capitalize"
      >
        {title}
      </Text>
    </Box>
  );
}
