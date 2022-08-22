export interface IClient {
  id: number;
  title: string;
  inn: string;
  phone: string;
  mail: string;
  address: string;
}

export interface IService {
  id: number;
  title: string;
  price: number;
  duration: number;
}

export interface IDocument {
  id: number;
  date: string;
  client_id: number;
  service_id: number;
  client_title: string;
  service_title: string;
}

export interface IColumn {
  title:string,
  visible:boolean
}