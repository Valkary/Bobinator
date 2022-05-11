import React from "react";
import { Skeleton } from "@mantine/core";

const OrdersSkeleton: React.FunctionComponent = ({}) => {

  return(
    <div className=" h-full w-11/12">
      <div className=" pt-5">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>
      <div className=" pt-5">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>
      <div className=" pt-5">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>
      <div className=" pt-5">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>
    </div>
  );
};

export default OrdersSkeleton;