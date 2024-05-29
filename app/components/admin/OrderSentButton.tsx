'use client';
import { editSendStatus } from '@/app/actions/actions';
import { OrderWithInformation } from '@/app/types';
import { Button } from '@chakra-ui/react';

interface Props {
  order: OrderWithInformation;
}
export default function OrderSentButton(props: Props) {
  const handleClick = async () => {
    await editSendStatus(props.order);
  };
  return (
    <>
      {props.order.sentStatus ? (
        <Button colorScheme="green" onClick={() => handleClick()}>
          SENT
        </Button>
      ) : (
        <Button colorScheme="red" onClick={() => handleClick()}>
          NOT SENT
        </Button>
      )}
    </>
  );
}
