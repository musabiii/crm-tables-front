import React, { FC } from "react";
import { EOrder, IColumn } from "../models/models";

interface SortProps {
  sortCol: string;
  order: EOrder;
  setSortCol: Function;
  setOrder: Function;
  columns: IColumn[];
}

export const Sort: FC<SortProps> = ({
  sortCol,
  order,
  setSortCol,
  setOrder,
  columns,
}) => {
  const handleChangeCol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCol(e.currentTarget.value);
  };

  const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.currentTarget.value);
  };

  return (
    <div>
      <select
        title="column"
        value={sortCol}
        name="column"
        id="column"
        onChange={handleChangeCol}
      >
        {columns.map((col) => (
          <option key={col.title} value={col.title}>{col.title}</option>
        ))}
      </select>

      <select
        title="sort"
        value={order}
        name="sort"
        id="sort"
        onChange={handleChangeOrder}
      >
        <option value={EOrder.asc}>ascending</option>
        <option value={EOrder.desc}>descending</option>
      </select>
    </div>
  );
};
