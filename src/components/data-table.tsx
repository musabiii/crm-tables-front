import React, { useEffect, useState } from "react";
import { EOrder, IClient, IColumn } from "../models/models";
import { Filter } from "./filter";
import { Pagination } from "./pagination";

interface IDataTable {
  columns: IColumn[];
  lazyFetch: Function;
  fetchData:Function
  data:any[]
}

export default function DataTable({ columns, fetchData,data }: IDataTable) {

  const [selectedRow, setSelectedRow] = useState(0);
  const [sortCol, setSortCol] = useState("id");
  const [order, setOrder] = useState<EOrder>(EOrder.asc);
  const [filterCol, setFilterCol] = useState("id");
  const [filterCompare, setFilterCompare] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [infinityScroll, setInfinityScroll] = useState<boolean>(false);
  const [listened, setListened] = useState(false);

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

  // const [fetchData, { data }] = lazyFetch();

  const [list, setList] = useState(data);

  //* update fetch
  useEffect(() => {
    console.log("use effect [fetch]Data(fetchOptions()");
    fetchData(fetchOptions());
  }, [sortCol, order, filterCol, filterCompare, filterValue]);

  //* mount
  useEffect(() => {
    fetchData(fetchOptions());
  }, []);

  // const [list,setList] = useState(data);

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
    fetchData(fetchOptions());
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

  const sortType = (col: string) => {
    if (sortCol === col) {
      return order;
    }
    return null;
  };

  const handleClickRow = (
    e: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => {
    console.log(e.detail);
    if (e.detail === 2) {
    }

    if (id === selectedRow) {
      setSelectedRow(0);
    } else {
      setSelectedRow(id);
    }
  };

  const handleSetSort = (col: string) => {
    if (col === sortCol) {
      setOrder(order === EOrder.asc ? EOrder.desc : EOrder.asc);
    } else {
      setOrder(EOrder.asc);
      setSortCol(col);
    }
  };

  return (
    <div >
      <Filter
        columns={columns}
        filterCol={filterCol}
        filterCompare={filterCompare}
        filterValue={filterValue}
        setFilterCol={setFilterCol}
        setFilterCompare={setFilterCompare}
        setFilterValue={setFilterValue}
      />

      <div className="data-table">

      <table>
        <thead>
          <tr>
            {columns.map(
              (col) =>
                col.visible && (
                  <td onClick={() => handleSetSort(col.title)} key={col.title}>
                    {col.title}
                    <SortBlock sortType={sortType(col.title)} />
                  </td>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {list.map((row) => {
            return (
              <tr
                key={row.id}
                className={`table-row ${
                  selectedRow === row.id ? "table-row-selected" : ""
                }`}
                onClick={(e) => handleClickRow(e, row.id)}
              >
                {columns.map((col) => {
                  return (
                    col.visible && <td key={col.title}>{row[col.title]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        infinityScroll={infinityScroll}
        handleChangeInfinityScroll={handleChangeInfinityScroll}
      />
    </div>
  );
}

function SortBlock({ sortType }: any) {
  return (
    <span className="sort-block">
      <span className={sortType === EOrder.asc ? "arr-ordered" : "arr"}>
        &#8595;
      </span>
      <span className={sortType === EOrder.desc ? "arr-ordered" : "arr"}>
        &#8593;
      </span>
    </span>
  );
}
