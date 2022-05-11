import React from 'react';
import { Notification, Dialog } from '@mantine/core';
import { CheckCircleFill } from '@styled-icons/bootstrap/CheckCircleFill';
import { ErrorCircle } from 'styled-icons/boxicons-solid';
import { Dangerous } from 'styled-icons/material-sharp';

export const CustomNotification: React.FunctionComponent<{ title: string, content: string, status: "success" | "error" | "warning" }> = ({ title, content, status }) => {
  return (
    <Dialog
      opened
      withCloseButton
      size={"lg"}
      radius={"md"}
      position={{ bottom: 20, left: 20 }}
    >
      <Notification
        onClose={() => {}} 
        icon={
          status === "success" ? <CheckCircleFill className=' h-12 text-green-600'/> :
          status === "error" ? <Dangerous className=' h-12 text-red-600'/> :
          <ErrorCircle className=' h-12 text-yellow-500'/>
        }
        title={title}>
        {content}
      </Notification>
    </Dialog>
  );
};