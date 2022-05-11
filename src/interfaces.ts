export interface Order {
  id: number,
  vueltas: number,
  cliente: number,
  id_etapa: number,
  prod_time: string,
  name: string,
};

export interface Etapa {
  id: number,
  name: string,
  description: string
};

export interface Log {
  date_time: string,
  log: string,
  id: number
};

export interface OrderCount  {
  total_orders: number,
  approved_count: number, 
  not_approved_count: number,
  in_prod_count: number,
  finished_count: number,
  approved: number,
  not_approved: number,
  in_prod: number,
  finished: number
}