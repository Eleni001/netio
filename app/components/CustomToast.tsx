import { Box, Text } from '@chakra-ui/react';

interface Props {
  toastTitle: string;
  toastContent: string;
  toastSuccess: boolean;
}

export default function CustomToast(props: Props) {
  return (
    <Box
      bg={props.toastSuccess ? 'green.500' : 'red.500'}
      color="white"
      p={3}
      borderRadius="md"
      boxShadow="lg"
    >
      <Text fontWeight="bold">{props.toastTitle}</Text>
      <Text>{props.toastContent}</Text>
    </Box>
  );
}
