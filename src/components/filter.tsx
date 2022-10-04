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
    if (e.currentTarget.value === 'id' && filterCompare === 'like') {
      setFilterCompare('=')
    }

    setFilterCol(e.currentTarget.value);
  };

  const handleChangeCompare = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked)
    if (e.currentTarget.checked) {
      setFilterCompare('=');
    } else {
      setFilterCompare('like')
    }
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
    <div className="filter">
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


      <input
        value={debounceValue}
        type="search"
        name=""
        id=""
        title="title"
        onChange={handleChangeValue}
      />
      <input disabled={filterCol==='id'} checked={filterCompare === '='} type="checkbox" title="equal" id="equal" onChange={handleChangeCompare}/>
      <label htmlFor="equal">exact match</label>
    </div>
  );
};
