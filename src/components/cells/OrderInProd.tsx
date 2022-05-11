import React from "react";
import { Accordion, Badge } from "@mantine/core";

import ProductionTimeline from "../atoms/ProductionTimeline";
import ApproveOrderBtn from "../atoms/ApproveOrderBtn";

import { Order, Etapa } from "../../interfaces";

const OrderInProd: React.FunctionComponent<{ enoughWidth: boolean, prod_state: string, orders: Order[], etapas: Etapa[] }> = ({ enoughWidth, prod_state, orders, etapas }) => {
  return (
    <Accordion transitionDuration={450} className=" min-w-full min-h-full">
      {
        typeof orders !== 'undefined' &&
        orders.map((order: Order) => {
          const { id, vueltas, cliente, id_etapa, name } = order;

          return (
            <Accordion.Item label={`Pedido #${id} - ${vueltas} vueltas`} key={`order-${id}-${vueltas}`}>
              <div className=" mb-5 flex flex-row justify-between items-center">
                <Badge size={"lg"} radius={"xl"} color={"teal"}>{name}</Badge>
                {
                  id_etapa === 1 &&
                    <ApproveOrderBtn order_id={id} prod_state={prod_state} />
                }
              </div>
              <ProductionTimeline 
                etapa={id_etapa}
                etapas={etapas}
                prod_state={prod_state}
                enoughWidth={enoughWidth} 
              ></ProductionTimeline>
            </Accordion.Item>
          )
        })
      }
    </Accordion>
  );
};

export default OrderInProd;