[33mcommit 4ca85b25483857a25c46fc764be0e5fcd09f9578[m
Author: Musabii Mambetov <musabi@live.com>
Date:   Thu Aug 25 02:16:32 2022 +0300

    checkboxes select

[1mdiff --git a/src/App.css b/src/App.css[m
[1mindex f04ab73..b930a37 100644[m
[1m--- a/src/App.css[m
[1m+++ b/src/App.css[m
[36m@@ -1,11 +1,29 @@[m
[32m+[m[32m@import url(https://fonts.googleapis.com/css?family=Maven+Pro:regular,500,600,700,800,900);[m
[32m+[m
 * {[m
   box-sizing: border-box;[m
   margin: 0;[m
   padding: 0;[m
 }[m
 [m
[32m+[m[32mbody {[m
[32m+[m[32m  font-family: 'Maven Pro',Arial, Helvetica, sans-serif;[m
[32m+[m[32m  font-size: 18px;[m
[32m+[m[32m  color: #696969;[m
[32m+[m[32m}[m
[32m+[m
 table {[m
   border-collapse: collapse;[m
[32m+[m[32m  margin: 0 auto;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.data-table {[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.page {[m
[32m+[m[32m  width: 50%;[m
[32m+[m[32m  margin: 0 auto;[m
 }[m
 [m
 table tr td{[m
[36m@@ -13,6 +31,27 @@[m [mtable tr td{[m
   padding: 5px;[m
 }[m
 [m
[32m+[m[32mtable thead {[m
[32m+[m[32m  background-color: #eee;[m
[32m+[m[32m  font-weight: 700;[m
[32m+[m[32m  text-transform: uppercase;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.table-row:hover {[m
[32m+[m[32m  background-color: #eee;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.table-row-selected {[m
[32m+[m[32m  background-color: #eee;[m
[32m+[m[32m  font-weight: 600;[m
[32m+[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.label-order {[m
[32m+[m[32m  margin: 3px;[m
[32m+[m[32m}[m
[32m+[m
 .pagination {[m
   display: flex;[m
   gap: 5px;[m
[36m@@ -27,4 +66,33 @@[m [mtable tr td{[m
   padding: 2px;[m
   width: 50px;[m
   text-align: center;[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.home-link {[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  font-weight: 700;[m
[32m+[m[32m  font-size: 24px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32minput,select {[m
[32m+[m[32m  padding: 2px;[m
[32m+[m[32m  margin: 3px 5px;[m
[32m+[m[32m  outline: none;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m  border-bottom: #898989 solid 1px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.actions {[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  gap: 5px;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  color: #696969;[m
[32m+[m[32m  font-weight: 700;[m
[32m+[m[32m  font-size: 24px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.action:hover {[m
[32m+[m[32m  color: black;[m
[32m+[m[32m}[m
[41m+[m
[41m+[m
[1mdiff --git a/src/components/actions.tsx b/src/components/actions.tsx[m
[1mindex 51249ba..553eefb 100644[m
[1m--- a/src/components/actions.tsx[m
[1m+++ b/src/components/actions.tsx[m
[36m@@ -2,6 +2,12 @@[m [mimport React from 'react'[m
 [m
 export default function Actions() {[m
   return ([m
[31m-    <div>Actions</div>[m
[32m+[m[32m    <div className='actions'>[m
[32m+[m
[32m+[m[32m      <div className="open-action action">open</div>[m
[32m+[m[32m      <div className="edit-action action">edit</div>[m
[32m+[m[32m      <div className="create-action action">create</div>[m
[32m+[m
[32m+[m[32m    </div>[m
   )[m
 }[m
[1mdiff --git a/src/components/data-table.tsx b/src/components/data-table.tsx[m
[1mindex 02ea9e6..dbaebcc 100644[m
[1m--- a/src/components/data-table.tsx[m
[1m+++ b/src/components/data-table.tsx[m
[36m@@ -1,4 +1,4 @@[m
[31m-import React from "react";[m
[32m+[m[32mimport React, { useState } from "react";[m
 import { IColumn } from "../models/models";[m
 [m
 interface IDataTable {[m
[36m@@ -7,9 +7,25 @@[m [minterface IDataTable {[m
 }[m
 [m
 export default function DataTable({ data, columns }: IDataTable) {[m
[32m+[m
[32m+[m[32m  const [selectedRow,setSelectedRow] = useState(0)[m
[32m+[m
[32m+[m[32m  const handleClickRow = (e:React.MouseEvent<HTMLTableRowElement>,id:number) => {[m
[32m+[m[32m    console.log(e.detail);[m
[32m+[m[32m    if (e.detail === 2) {[m
[32m+[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    if (id===selectedRow) {[m
[32m+[m[32m      setSelectedRow(0)[m
[32m+[m[32m    } else {[m
[32m+[m[32m      setSelectedRow(id)[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
[32m+[m
   return ([m
[31m-    <div>[m
[31m-      <table>[m
[32m+[m[32m    <div className="data-table">[m
[32m+[m[32m      <table >[m
         <thead>[m
           <tr>[m
             {columns.map([m
[36m@@ -20,7 +36,7 @@[m [mexport default function DataTable({ data, columns }: IDataTable) {[m
         <tbody>[m
           {data.map((row) => {[m
             return ([m
[31m-              <tr key={row.id}>[m
[32m+[m[32m              <tr key={row.id} className={`table-row ${selectedRow===row.id?"table-row-selected":""}`} onClick={(e)=>handleClickRow(e,row.id)}>[m
                 {columns.map((col) => {[m
                   return ([m
                     col.visible && <td key={col.title}>{row[col.title]}</td>[m
[1mdiff --git a/src/components/filter.tsx b/src/components/filter.tsx[m
[1mindex d05ca8b..a57c403 100644[m
[1m--- a/src/components/filter.tsx[m
[1m+++ b/src/components/filter.tsx[m
[36m@@ -23,13 +23,22 @@[m [mexport const Filter: FC<FilterProps> = ({[m
   const [debounceValue, setDebounceValue] = useState(filterValue);[m
 [m
   const handleChangeCol = (e: React.ChangeEvent<HTMLSelectElement>) => {[m
[32m+[m[32m    if (e.currentTarget.value === 'id' && filterCompare === 'like') {[m
[32m+[m[32m      setFilterCompare('=')[m
[32m+[m[32m    }[m
     setFilterCol(e.currentTarget.value);[m
   };[m
 [m
[31m-  const handleChangeCompare = (e: React.ChangeEvent<HTMLSelectElement>) => {[m
[31m-    setFilterCompare(e.currentTarget.value);[m
[32m+[m[32m  const handleChangeCompare = (e: React.ChangeEvent<HTMLInputElement>) => {[m
[32m+[m[32m    console.log(e.currentTarget.checked)[m
[32m+[m[32m    if (e.currentTarget.checked) {[m
[32m+[m[32m      setFilterCompare('=');[m
[32m+[m[32m    } else {[m
[32m+[m[32m      setFilterCompare('like')[m
[32m+[m[32m    }[m
   };[m
 [m
[32m+[m
   useEffect(() => {[m
     const timer = setTimeout(() => {[m
       setFilterValue(debounceValue);[m
[36m@@ -59,16 +68,7 @@[m [mexport const Filter: FC<FilterProps> = ({[m
         ))}[m
       </select>[m
 [m
[31m-      <select[m
[31m-        title="compare"[m
[31m-        value={filterCompare}[m
[31m-        name="compare"[m
[31m-        id="compare"[m
[31m-        onChange={handleChangeCompare}[m
[31m-      >[m
[31m-        <option value="=">eq</option>[m
[31m-        <option value="like">like</option>[m
[31m-      </select>[m
[32m+[m
       <input[m
         value={debounceValue}[m
         type="search"[m
[36m@@ -77,6 +77,8 @@[m [mexport const Filter: FC<FilterProps> = ({[m
         title="title"[m
         onChange={handleChangeValue}[m
       />[m
[32m+[m[32m      <input disabled={filterCol==='id'} checked={filterCompare === '='} type="checkbox" title="equal" id="equal" onChange={handleChangeCompare}/>[m
[32m+[m[32m      <label htmlFor="equal">exact match</label>[m
     </div>[m
   );[m
 };[m
[1mdiff --git a/src/components/sort.tsx b/src/components/sort.tsx[m
[1mindex fd3f2b9..8b68c4b 100644[m
[1m--- a/src/components/sort.tsx[m
[1m+++ b/src/components/sort.tsx[m
[36m@@ -20,12 +20,19 @@[m [mexport const Sort: FC<SortProps> = ({[m
     setSortCol(e.currentTarget.value);[m
   };[m
 [m
[31m-  const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {[m
[32m+[m[32m  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {[m
     setOrder(e.currentTarget.value);[m
[32m+[m
[32m+[m[32m    if (e.currentTarget.checked) {[m
[32m+[m[32m      setOrder('desc');[m
[32m+[m[32m    } else {[m
[32m+[m[32m      setOrder('asc')[m
[32m+[m[32m    }[m
   };[m
 [m
   return ([m
     <div>[m
[32m+[m[32m      <label className="label-order" htmlFor="column"> order by:</label>[m
       <select[m
         title="column"[m
         value={sortCol}[m
[36m@@ -38,16 +45,8 @@[m [mexport const Sort: FC<SortProps> = ({[m
         ))}[m
       </select>[m
 [m
[31m-      <select[m
[31m-        title="sort"[m
[31m-        value={order}[m
[31m-        name="sort"[m
[31m-        id="sort"[m
[31m-        onChange={handleChangeOrder}[m
[31m-      >[m
[31m-        <option value={EOrder.asc}>ascending</option>[m
[31m-        <option value={EOrder.desc}>descending</option>[m
[31m-      </select>[m
[32m+[m[32m      <input checked={order === 'desc'} type="checkbox" title="equal" id="order" onChange={handleChangeOrder}/>[m
[32m+[m[32m      <label htmlFor="order">desc</label>[m
     </div>[m
   );[m
 };[m
[1mdiff --git a/src/pages/clients.tsx b/src/pages/clients.tsx[m
[1mindex d78a445..9495435 100644[m
[1m--- a/src/pages/clients.tsx[m
[1m+++ b/src/pages/clients.tsx[m
[36m@@ -20,6 +20,7 @@[m [mexport default function Clients() {[m
 [m
 [m
 [m
[32m+[m
   const { data } = useGetClientsQuery({[m
     sortCol,[m
     order,[m
[36m@@ -57,9 +58,8 @@[m [mexport default function Clients() {[m
   ];[m
 [m
   return ([m
[31m-    <div>[m
[31m-      <Link to="/">Home</Link>[m
[31m-      <Search />[m
[32m+[m[32m    <div className="client page">[m
[32m+[m[32m      <Link to="/" className="home-link">Home</Link>[m
       <Filter[m
         columns={columns}[m
         filterCol={filterCol}[m
