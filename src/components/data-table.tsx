import React, { useEffect, useState } from "react";
import { EOrder, IColumn, IRowBase } from "../models/models";
import { Filter } from "./filter";
import { Pagination } from "./pagination";

interface IDataTable<D> {
  columns: IColumn[];
  fetchData: Function;
  data: D[];
}



export default function DataTable<D extends IRowBase>(props: IDataTable<D>): JSX.Element {

  const { columns, fetchData, data } = props;


  const [selectedRow, setSelectedRow] = useState(0);
  const [sortCol, setSortCol] = useState("id");
  const [order, setOrder] = useState<EOrder>(EOrder.asc);
  const [filterCol, setFilterCol] = useState("id");
  const [filterCompare, setFilterCompare] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState<number>(1);

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

  useEffect(() => {
    console.log("use effect [fetch]Data(fetchOptions()");
    fetchData(fetchOptions());
  }, [sortCol, order, filterCol, filterCompare, filterValue, page]);

  useEffect(() => {
    fetchData(fetchOptions());
  }, []);

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
    <div>
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
                    <td
                      onClick={() => handleSetSort(col.title)}
                      key={col.title}
                    >
                      {col.title}
                      <SortBlock sortType={sortType(col.title)} />
                    </td>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
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
        infinityScroll={false}
        handleChangeInfinityScroll={() => {}}
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
