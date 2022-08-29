import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "../components/actions";
import DataTable from "../components/data-table";
import { Filter } from "../components/filter";
import { Pagination } from "../components/pagination";
import { useGetClientsQuery, useLazyGetClientsQuery } from "../store/crm.api";
import { EOrder, IClient, IColumn } from "../models/models";
import { Sort } from "../components/sort";

export default function Clients() {
  const [sortCol, setSortCol] = useState("id");
  const [order, setOrder] = useState<EOrder>(EOrder.asc);
  const [filterCol, setFilterCol] = useState("id");
  const [filterCompare, setFilterCompare] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [infinityScroll, setInfinityScroll] = useState<boolean>(false);

  const [fetchClients, { data }] = useLazyGetClientsQuery();

  const [listened, setListened] = useState(false);

  const [list, setList] = useState(data);

  const fetchOptions = () => {
    return {
      sortCol,
      order,
      filterCol,
      filterCompare,
      filterValue,
      page,
    };
  };

  //* update fetch
  useEffect(() => {
    console.log("use effect [fetch]");
    fetchClients(fetchOptions());
  }, [sortCol, order, filterCol, filterCompare, filterValue]);

  //* mount
  useEffect(() => {
    fetchClients(fetchOptions());
  }, []);

  const dt = document.querySelector(".data-table");

  function listener() {
    if (
      (dt?.scrollTop || 0) + (dt?.clientHeight || 0) + 20 >=
      (dt?.scrollHeight || 0)
    ) {
      console.log("scroll more", page + 1);
      setPage(page + 1);
    }
  }

  //*  [page]
  useEffect(() => {
    console.log("use effect [page]");
    if (!infinityScroll) {
      setList([]);
      dt?.scrollTo(0, 0);
    }
    fetchClients(fetchOptions());
    console.log(dt);
    if (dt && infinityScroll) {
      setTimeout(() => {
        console.log("set listener");
        dt.addEventListener("scroll", listener);
      }, 300);
    }

    return () => {
      dt?.removeEventListener("scroll", listener);
      console.log("destroy");
    };
  }, [page]);

  //* [infinityScroll]
  useEffect(() => {
    if (dt && infinityScroll) {
      dt.addEventListener("scroll", listener);
    } else if (dt && !infinityScroll) {
      console.log("remove listener");
    }

    return () => {
      dt?.removeEventListener("scroll", listener);
    };
  }, [infinityScroll]);

  const handleChangeInfinityScroll = () => {
    if (page !== 1) {
      if (infinityScroll) {
        setList([]);
      }
      console.log("handleChangeInfinityScroll");
      setPage(1);
    }
    dt?.scrollTo(0, 0);
    setInfinityScroll(!infinityScroll);
  };

  useEffect(() => {
    console.log("useEffect [data]", data);
    if (infinityScroll) {
      setList([...(list || []), ...(data || [])]);
    } else {
      setList(data);
    }
  }, [data]);

  useEffect(() => {
    console.log("change list", list);
  }, [list]);

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
      <Actions columns={columns} changeVisible={changeVisible} />
      <DataTable
        data={list ?? []}
        columns={columns}
        order={order}
        sortCol={sortCol}
        setSortCol={setSortCol}
        setOrder={setOrder}
      />
      <Pagination
        page={page}
        setPage={setPage}
        infinityScroll={infinityScroll}
        handleChangeInfinityScroll={handleChangeInfinityScroll}
      />
    </div>
  );
}
