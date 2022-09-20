
export interface IClient extends IRowBase {
  inn: string;
  phone: string;
  mail: string;
  address: string;
}

export interface IRowBase {
  id: number;
  title: string;
}

export enum EClientColumns {
  id = "id",
  title = "title",
  inn = "inn",
  phone = "phone",
  mail= "mail",
  address= "address",
}

export type TClient = 'id' | 'title' | 'inn' | 'phone' | 'mail' | 'address';

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
  visible:boolean,
  width: number,
  getOptions?:Function
}

export enum EOrder {
  asc = 'asc',
  desc = 'desc'
}
export interface IQuery {
  sortCol:string,
  order:EOrder,
  filterCol:string,
  filterCompare:string,
  filterValue:string
  page:number
}

export enum ECompare {
  eq='=',
  like = 'like'
}

export enum EActionType {
  open='open',
  edit = 'edit',
  create = 'create',
  delete = 'delete'
}


export interface IOption {
  text:string,
  value:string
}
