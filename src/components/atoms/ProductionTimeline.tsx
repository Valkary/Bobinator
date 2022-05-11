import React from 'react';
import { Stepper } from '@mantine/core';
import { Exclamation } from "@styled-icons/bootstrap/Exclamation";

import { Etapa } from '../../interfaces'; 

const ProductionTimeline: React.FunctionComponent<{ etapa: number, etapas: Etapa[] | undefined, prod_state: string, enoughWidth: boolean, curr_order?: boolean }> = ({ etapa, etapas, prod_state, enoughWidth, curr_order }) => {    
  return (
    <Stepper 
      active={etapa}
      orientation={enoughWidth ? "horizontal" : "vertical"}
      color={prod_state === "stopped" ? 'red' : prod_state === "waiting" ? 'green' : 'blue'}
      className={` ${curr_order ? ' w-11/12' : 'w-full'} h-full`}
    >
      {
        typeof etapas !== 'undefined' &&
        etapas.map((curr_etapa: Etapa, idx: number) => {

          if (etapa === idx) {
            if (prod_state === "stopped") {
              return (
                <Stepper.Step
                  label={curr_etapa.name}
                  key={curr_etapa.id}
                  color={'red'}
                  icon={<Exclamation className=' text-red-500'/>}
                  description={curr_etapa.description}
                ></Stepper.Step>
              );
            } else if (prod_state === "waiting") {
              return (
                <Stepper.Step
                  label={curr_etapa.name}
                  key={curr_etapa.id}
                  color={'green'}
                  description={curr_etapa.description}
                ></Stepper.Step>
              );
            } else {
              return (
                <Stepper.Step
                  label={curr_etapa.name}
                  key={curr_etapa.id}
                  description={curr_etapa.description}
                  loading={curr_order}
                ></Stepper.Step>
              );
            }
          } else {
            if (prod_state === "stopped") {
              return (
                <Stepper.Step
                  label={curr_etapa.name}
                  key={curr_etapa.id}
                  color={'red'}
                  description={curr_etapa.description}
                ></Stepper.Step>
              );
            } else if (prod_state === "waiting") {
              return (
                <Stepper.Step
                  label={curr_etapa.name}
                  key={curr_etapa.id}
                  color={'green'}
                  description={curr_etapa.description}
                ></Stepper.Step>
              );
            } else {
              return (
                <Stepper.Step
                  label={curr_etapa.name}
                  key={curr_etapa.id}
                  description={curr_etapa.description}
                ></Stepper.Step>
              );
            }
          }
        })
      }
    </Stepper>
  );
}

export default ProductionTimeline;