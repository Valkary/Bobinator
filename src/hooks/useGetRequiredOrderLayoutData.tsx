import { useState, useEffect } from 'react';
import { Etapa, Order } from '../interfaces';

import useFetchFinishedOrders from "./useFetchFinishedOrders";
import useFetchApprovedOrders from "./useFetchApprovedOrders";
import useFetchOrdersInProd from "./useFetchOrdersInProd";
import useFetchOrdersOnHold from "./useFetchOrdersOnHold";
import useFetchOrderStages from "./useFetchOrderStages";

export default function useGetRequiredOrderLayoutData() {
  const [finishedOrders, setFinishedOrders] = useState<Order[]>();
  const [approvedOrders, setApprovedOrders] = useState<Order[]>();
  const [inProdOrders, setInProdOrders] = useState<Order[]>();
  const [ordersOnHold, setOrdersOnHold] = useState<Order[]>();
  const [orderStages, setOrderStages] = useState<Etapa[]>();

  const fetchFinishedOrders = useFetchFinishedOrders();
  const fetchApprovedOrders = useFetchApprovedOrders();
  const fetchOrdersInProd = useFetchOrdersInProd();
  const fetchOrdersOnHold = useFetchOrdersOnHold();
  const fetchOrderStages = useFetchOrderStages();

  const fetchArray = [
    fetchFinishedOrders,
    fetchApprovedOrders,
    fetchOrdersInProd,
    fetchOrdersOnHold,
    fetchOrderStages
  ];

  const stateArray = [
    finishedOrders,
    approvedOrders,
    inProdOrders,
    ordersOnHold,
    orderStages
  ]

  useEffect(() => {
    setFinishedOrders(fetchFinishedOrders?.data);
    setApprovedOrders(fetchApprovedOrders?.data);
    setInProdOrders(fetchOrdersInProd?.data);
    setOrdersOnHold(fetchOrdersOnHold?.data);
    setOrderStages(fetchOrderStages?.data);
  }, [fetchArray]);

  if (stateArray.every(element => typeof element !== 'undefined')) {
    return {
      finishedOrders,
      approvedOrders,
      inProdOrders,
      ordersOnHold,
      orderStages
    }
  } else if (fetchArray.some(element => element.isLoading)) {
    return "loading";
  } else {
    return "error";
  }
};