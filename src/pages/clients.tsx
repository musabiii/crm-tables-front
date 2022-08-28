import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "../components/actions";
import DataTable from "../components/data-table";
import { Filter } from "../components/filter";
import { Pagination } from "../components/pagination";
import Search from "../components/search";
import { useGetClientsQuery } from "../store/crm.api";
import { EOrder, IColumn } from "../models/models";
import { Sort } from "../components/sort";

export default function Clients() {
  const [sortCol, setSortCol] = useState("id");
  const [order, setOrder] = useState<EOrder>(EOrder.asc);
  const [filterCol, setFilterCol] = useState("id");
  const [filterCompare, setFilterCompare] = useState("=");
  const [filterValue, setFilterValue] = useState("");

  const [page, setPage] = useState(1);

  const [infinityScroll, setInfinityScroll] = useState<boolean>(false);

  useEffect(()=>{

    // const dt = document.querySelector('.data-table');
    // console.log("dt",dt)

    const dt = document.body;

    if (dt) {

        dt.addEventListener("scroll", () => {
          console.log("clientHeight", dt?.clientHeight);
          console.log("scrollHeight", dt?.scrollHeight);
          if (
            dt?.scrollTop || 0 + (dt?.clientHeight || 0) + 100 >=
            (dt?.scrollHeight || 0)
          ) {
            console.log("scroll more");
          }
        });

    }


  },[])


  const { data } = useGetClientsQuery({
    sortCol,
    order,
    filterCol,
    filterCompare,
    filterValue,
    page,
  });

  const [list, setList] = useState(data);

  useEffect(() => {
    if (infinityScroll) {
      setList([...(list || []), ...(data || [])]);
    } else {
      setList(data);
    }
  }, [data]);

  const columnsList: IColumn[] = [
    {
      title: "id",
      visible: true,
    },
    {
      title: "title",
      visible: true,
    },
    {
      title: "inn",
      visible: true,
    },
    {
      title: "phone",
      visible: true,
    },
    {
      title: "mail",
      visible: true,
    },
    {
      title: "address",
      visible: true,
    },
  ];

  const [columns, setColumns] = useState<IColumn[]>(columnsList);

  const changeVisible = (col: IColumn) => {
    setColumns((cols) => {
      const index = cols.findIndex((el) => el.title === col.title);
      cols[index] = col;
      return [...cols];
    });
  };

  return (
    <div className="client page">
      <Link to="/" className="home-link">
        Home
      </Link>
      <Filter
        columns={columns}
        filterCol={filterCol}
        filterCompare={filterCompare}
        filterValue={filterValue}
        setFilterCol={setFilterCol}
        setFilterCompare={setFilterCompare}
        setFilterValue={setFilterValue}
      />
      <Sort
        sortCol={sortCol}
        order={order}
        setSortCol={setSortCol}
        setOrder={setOrder}
        columns={columns}
      />
      <Actions columns={columns} changeVisible={changeVisible} />
      <DataTable data={list ?? []} columns={columns} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
