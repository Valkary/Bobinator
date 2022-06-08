import React, { useState, useContext } from "react";
import { Alert, Chips, Chip, Badge, Card } from "@mantine/core";
import { ExclamationCircle } from "@styled-icons/bootstrap/ExclamationCircle";
import { format } from 'date-fns';

import { SocketContext } from '../../context/socket';

import OrdersSkeleton from "../atoms/OrdersSkeleton";
import ApproveOrderBtn from "../atoms/ApproveOrderBtn";
import ProductionTimeline from "../atoms/ProductionTimeline";
import OrderForm from "../atoms/OrderForm";

import useGetRequiredOrderLayoutData from "../../hooks/useGetRequiredOrderLayoutData";

const OrdersLayout: React.FunctionComponent<{ enoughWidth: boolean, prod_state: string }> = ({ enoughWidth, prod_state }) => {
  const [selectedChip, setSelectedChip] = useState(['approved', 'finished', 'on-hold']);

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
          <div>
          {
            typeof inprod_orders !== 'undefined' && typeof etapas !== 'undefined' && 
            inprod_orders.map(order => { 
              return (
                <Card className={` rounded-md m-5 p-0 border-2 border-gray-700`} key={`in-prod-${order.id}`}>
                  <div className=" h-full animate-pulse flex flex-col">
                    <div className=" grid grid-cols-[15%_85%] font-semibold justify-center items-center h-full w-full">
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
                            <div className=" text-gray-400 text-opacity-80">METROS</div>
                            <div>{order.vueltas}</div>
                          </div>
                          <div className=" flex flex-col items-center">
                            <div className=" text-gray-400 text-opacity-80">ETAPA ACTUAL</div>
                            <div>{etapas[order.id_etapa - 1].name}</div>
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

          <OrderForm />

          <Chips variant="filled" multiple onChange={setSelectedChip} value={selectedChip} className=" mb-5">
            <Chip value="approved">Aprobados</Chip>
            <Chip value="finished">Terminados</Chip>
            <Chip value="on-hold">En espera</Chip>
          </Chips>

          <div className=" max-h-full grow">
            <table
              className=' w-full text-sm text-left text-gray-500 dark:text-gray-500'
            >
              <thead
                className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
              >
                <tr>
                  <th className=' px-6 py-3'>Pedido</th>
                  <th className=' px-6 py-3'>Metros</th>
                  <th className=' px-6 py-3'>Avance</th>
                </tr>
              </thead>
              <tbody>
                {
                  selectedChip.indexOf('on-hold') !== -1 && typeof on_hold_orders !== 'undefined' && on_hold_orders?.length > 0 &&
                  <tr
                    className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                  >
                    <td className=' px-6 py-4 font-medium text-yellow-300 dark:text-white whitespace-nowrap' colSpan={3}>
                      <div className="justify-center items-center flex flex-row">
                        EN ESPERA
                      </div>
                    </td>
                  </tr>
                }
                {
                  selectedChip.indexOf('on-hold') !== -1 && typeof on_hold_orders !== 'undefined' && on_hold_orders?.length > 0 &&
                  on_hold_orders.map(order => {

                    return (
                      <tr
                        className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      >
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>{`#${order.id}`}</td>
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>{`${order.vueltas}`}</td>
                        <td 
                          className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap justify-center items-center flex flex-col'
                        >
                          <ProductionTimeline 
                            etapa={order.id_etapa}
                            etapas={etapas}
                            prod_state={prod_state}
                            enoughWidth={enoughWidth} 
                          ></ProductionTimeline>
                          <div className=" mt-4">
                            <ApproveOrderBtn order_id={order.id} prod_state={prod_state} />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
                {
                  selectedChip.indexOf('approved') !== -1 && typeof approved_orders !== 'undefined' && approved_orders?.length > 0 &&
                  <tr
                    className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                  >
                    <td className=' px-6 py-4 font-medium text-blue-400 dark:text-white whitespace-nowrap' colSpan={3}>
                      <div className="justify-center items-center flex flex-row">
                        APROBADOS
                      </div>
                    </td>
                  </tr>
                }
                {
                  selectedChip.indexOf('approved') !== -1 && typeof approved_orders !== 'undefined' && approved_orders?.length > 0 &&
                  approved_orders.map(order => {
                    return (
                      <tr
                        className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      >
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>{`#${order.id}`}</td>
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>{`${order.vueltas}`}</td>
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>
                          <ProductionTimeline 
                            etapa={order.id_etapa}
                            etapas={etapas}
                            prod_state={"in_prod"}
                            enoughWidth={enoughWidth} 
                          ></ProductionTimeline>  
                        </td>
                      </tr>
                    )
                  })
                }
                {
                  selectedChip.indexOf('finished') !== -1 && typeof finished_orders !== 'undefined' && finished_orders?.length > 0 &&
                  <tr
                    className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                  >
                    <td className=' px-6 py-4 font-medium text-green-400 dark:text-white whitespace-nowrap' colSpan={3}>
                      <div className="justify-center items-center flex flex-row">
                        TERMINADOS
                      </div>
                    </td>
                  </tr>
                }
                {
                  selectedChip.indexOf('finished') !== -1 && typeof finished_orders !== 'undefined' && finished_orders?.length > 0 && 
                  finished_orders.map(order => {
                    return (
                      <tr
                        className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      >
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>{`#${order.id}`}</td>
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>{`${order.vueltas}`}</td>
                        <td className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'>
                          <ProductionTimeline 
                            etapa={order.id_etapa}
                            etapas={etapas}
                            prod_state={"waiting"}
                            enoughWidth={enoughWidth} 
                          ></ProductionTimeline>  
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      );
  }
};

export default OrdersLayout;