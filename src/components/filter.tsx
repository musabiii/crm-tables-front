import React, { FC, useEffect, useState } from "react";
import { IColumn } from "../models/models";

interface FilterProps {
  columns: IColumn[];
  filterCol: string;
  filterCompare: string;
  filterValue: string;
  setFilterCol: Function;
  setFilterCompare: Function;
  setFilterValue: Function;
}

export const Filter: FC<FilterProps> = ({
  columns,
  filterCol,
  filterCompare,
  filterValue,
  setFilterCol,
  setFilterCompare,
  setFilterValue,
}) => {
  const [debounceValue, setDebounceValue] = useState(filterValue);

  const handleChangeCol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCol(e.currentTarget.value);
  };

  const handleChangeCompare = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCompare(e.currentTarget.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterValue(debounceValue);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [debounceValue]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceValue(e.currentTarget.value);
  };

  return (
    <div>
      <select
        title="column"
        value={filterCol}
        name="column"
        id="column"
        onChange={handleChangeCol}
      >
        {columns.map((col) => (
          <option key={col.title} value={col.title}>
            {col.title}
          </option>
        ))}
      </select>

      <select
        title="compare"
        value={filterCompare}
        name="compare"
        id="compare"
        onChange={handleChangeCompare}
      >
        <option value="=">eq</option>
        <option value="like">like</option>
      </select>
      <input
        value={debounceValue}
        type="search"
        name=""
        id=""
        title="title"
        onChange={handleChangeValue}
      />
    </div>
  );
};
