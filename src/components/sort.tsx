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

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(e.currentTarget.value);

    if (e.currentTarget.checked) {
      setOrder('desc');
    } else {
      setOrder('asc')
    }
  };

  return (
    <div>
      <label className="label-order" htmlFor="column"> order by:</label>
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

      <input checked={order === 'desc'} type="checkbox" title="equal" id="order" onChange={handleChangeOrder}/>
      <label htmlFor="order">desc</label>
    </div>
  );
};
