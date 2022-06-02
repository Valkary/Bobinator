import React, { useState, useContext } from "react";
import { Alert, Chips, Chip, Badge, Card } from "@mantine/core";
import { ExclamationCircle } from "@styled-icons/bootstrap/ExclamationCircle";
import { format } from 'date-fns';

import { SocketContext } from '../../context/socket';

import OrdersSkeleton from "../atoms/OrdersSkeleton";
import OrderInProd from "../cells/OrderInProd";
import ProductionTimeline from "../atoms/ProductionTimeline";

import useGetRequiredOrderLayoutData from "../../hooks/useGetRequiredOrderLayoutData";

const OrdersLayout: React.FunctionComponent<{ enoughWidth: boolean, prod_state: string }> = ({ enoughWidth, prod_state }) => {
  const [selectedChip, setSelectedChip] = useState(['approved']);

  const requiredData = useGetRequiredOrderLayoutData();
  
  const socket = useContext(SocketContext);
  
  socket.emit('connected-from', 'OrdersLayout');
  
  
  if (requiredData === "loading") {
    return <OrdersSkeleton />
  } else if(requiredData === "error") {
    return (
      <Alert icon={<ExclamationCircle size={16} />} title="Error de conexión!" color="red">
          Hubo un error de conexión con el servidor. Hable con el técnico encargado del servidor para ver cuál es el problema.
        </Alert>
      );
    } else {
      const { finishedOrders, approvedOrders, inProdOrders, ordersOnHold, orderStages, refetchAll } = requiredData;
      
      socket.on("order_update", () => {
        refetchAll();
      });

      const etapas = orderStages;

      const on_hold_orders = ordersOnHold;
      const finished_orders = finishedOrders;
      const approved_orders = approvedOrders;
      const inprod_orders = inProdOrders;
      
      return (
        <div className=" flex flex-col h-full w-full overflow-y-scroll scrollbar">
          <Chips variant="filled" multiple onChange={setSelectedChip} value={selectedChip}>
            <Chip value="approved">Aprobados</Chip>
            <Chip value="finished">Terminados</Chip>
            <Chip value="on-hold">En espera</Chip>
            <Chip value="other">Otros</Chip>
          </Chips>

          <div>
          {
            // @ts-ignore
            inprod_orders.map(order => { 
              return (
                <Card className={` rounded-md m-5 p-0 border-2 border-gray-700`} key={`in-prod-${order.id}`}>
                  <div className=" h-full animate-pulse flex flex-col">
                    <div className=" grid grid-cols-[20%_80%] font-semibold justify-center items-center h-full w-full">

                      <div 
                        className={` bg-lightBackground text-gray-900 border-r-8 ${prod_state === "stopped" ? "border-r-red-600" : "border-r-blue-600"} text-9xl flex justify-center items-center h-full w-full`}
                      >
                        #{order.id}
                      </div>

                      <div className=" flex flex-col pl-5 grow py-2">
                        <div className=" flex flex-row items-center justify-center w-full h-full py-4">
                          <ProductionTimeline 
                            etapa={order.id_etapa}
                            etapas={etapas}
                            prod_state={prod_state === "stopped" ? "stopped" : "in-prod"}
                            enoughWidth={enoughWidth} 
                            curr_order={true}
                          />
                        </div>
                        <div className=" flex flex-row justify-around pt-5">
                          <div className=" flex flex-col items-center">
                            <div className=" text-gray-400 text-opacity-80">VUELTAS</div>
                            <div>{order.vueltas}</div>
                          </div>
                          <div className=" flex flex-col items-center">
                            <div className=" text-gray-400 text-opacity-80">ETAPA ACTUAL</div>
                            <div>{order.name}</div>
                          </div>
                          <div className=" flex flex-col items-center">
                            <div className=" text-gray-400 text-opacity-80">CLIENTE</div>
                            <div>{order.cliente}</div>
                          </div>
                          <div className=" flex flex-col items-center">
                            <div className=" text-gray-400 text-opacity-80">INICIO</div>
                            <div>
                              {
                                format(new Date(order.prod_time), 'yyyy-MM-dd kk:mm')
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          }
          </div>

          <div className=" max-h-full grow">
          {
            selectedChip.indexOf('on-hold') !== -1 &&
            <div className=" mt-5 pt-2 border-t-2 border-gray-600">
              {/* @ts-ignore */}
              <Badge size="lg" color={"yellow"}>En espera: {on_hold_orders.length}</Badge>
              {/* @ts-ignore */}
              <OrderInProd enoughWidth={enoughWidth} prod_state={"waiting"} orders={on_hold_orders} etapas={etapas} />
            </div>
          }
          {
            selectedChip.indexOf('approved') !== -1 &&
            <div className=" mt-5 pt-2 border-t-2 border-gray-600">
              {/* @ts-ignore */}
              <Badge size="lg">Aprobados: {approved_orders.length}</Badge>
              {/* @ts-ignore */}
              <OrderInProd  enoughWidth={enoughWidth} prod_state={prod_state} orders={approved_orders} etapas={etapas} />
            </div>
          }
          {
            selectedChip.indexOf('finished') !== -1 &&
            <div className=" mt-5 pt-2 border-t-2 border-gray-600">
              {/* @ts-ignore */}
              <Badge size="lg" color={"green"}>Terminados: {finished_orders.length}</Badge>
              {/* @ts-ignore */}
              <OrderInProd enoughWidth={enoughWidth} prod_state={"waiting"} orders={finished_orders} etapas={etapas} />
            </div>
          }
          </div>
        </div>
      );
  }
};

export default OrdersLayout;