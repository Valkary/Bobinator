import React, { useContext, useEffect, useState } from "react";

import { Badge } from "@mantine/core";
import { Report } from "@styled-icons/material-rounded/Report";
import { ProductionCheckmark } from "@styled-icons/fluentui-system-filled/ProductionCheckmark";

import { SocketContext } from "../../context/socket";

import OrdersLayout from "../organisms/OrdersLayout";
import ProgressIcons from "../atoms/ProgressIcons";
import useFetchProdState from "../../hooks/useFetchProdState";

const FeedbackComponents: any = {
  "stopped": {
    icon: <Report className=" h-12 text-2xl text-red-500" />,
    badge:
      <div className=" text-red-500">
        <Badge 
          className=" animate-pulse" 
          color={"red"} 
          size="xl"
        >
          <div className=" flex flex-row items-center">
            PARO DE EMERGENCIA ACTIVADO!
          </div>
        </Badge>
      </div>
  },
  "waiting": {
    icon: <ProductionCheckmark className=" h-12 text-2xl text-green-500" />,
    badge:
      <div className=" text-green-500">
        <Badge 
          className=" animate-pulse" 
          color={"green"} 
          size="xl"
        >
          <div className=" flex flex-row items-center">
            ESPERANDO PRODUCCIÓN!
          </div>
        </Badge>
      </div>
  },
  "in-prod": {
    icon: <ProgressIcons />,
    badge:
      <div className=" text-blue-500">
        <Badge 
          className=" animate-pulse" 
          color={"blue"} 
          size="xl"
        >
          <div className=" flex flex-row items-center">
            EN PRODUCCIÓN!
          </div>
        </Badge>
      </div>
  }
};

const Orders: React.FunctionComponent<{ enoughWidth: boolean }> = ({ enoughWidth }) => {
  const socket = useContext(SocketContext);
  const { data, refetch }  = useFetchProdState();
  const [prodState, setProdState] = useState("waiting");

  useEffect(() => {
    if (typeof data !== 'undefined') setProdState(data);
  }, [data]);
  
  socket.on("order_update", () => {
    refetch();
  });

  const Icon = FeedbackComponents[prodState].icon;
  const Badge = FeedbackComponents[prodState].badge;

  return (
    <div className=" grid grid-rows-prodRows h-full w-full pt-5">
      <div className=" row-start-1 row-span-1 grid grid-cols-3 items-center justify-center font-code text-gray-50">
        <div className=" flex flex-row col-start-2 w-full h-full justify-center items-center font-bold text-4xl">PRODUCCIÓN</div>
        <div className=" flex flex-row col-start-3 w-full h-full justify-end items-center animate-pulse pr-2 text-blue-400">
          { Icon }
        </div>
      </div>

      <div className=" row-start-2 row-span-1 pl-5 max-h-full max-w-full">
        <OrdersLayout enoughWidth={enoughWidth} prod_state={prodState} />
      </div>

      <div className=" row-start-3 row-span-1 font-code text-gray-50 flex flex-row pb-2 pl-2 pr-2 justify-end items-center text-xl">
        { Badge }
      </div>
    </div>
  );
};

export default Orders;