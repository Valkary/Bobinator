import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

import { Button, Select } from '@mantine/core';
import { NavigateNext, NavigateBefore } from 'styled-icons/material-sharp';
import { LastPage, FirstPage } from 'styled-icons/material-sharp';
import { SortAscending, SortDescending } from 'styled-icons/heroicons-solid';

const column_structure = [
  {
    Header: 'PEDIDO',
    accessor: 'id'
  },
  {
    Header: 'VUELTAS',
    accessor: 'vueltas'
  },
  {
    Header: 'ETAPA',
    accessor: 'etapa'
  },
  {
    Header: 'FECHA',
    accessor: 'date'
  },
  {
    Header: 'HORA',
    accessor: 'time'
  }
];

const HistoryTable: React.FC<{ order_history: any }> = ({ order_history }) => {
  const [columns, data] = useMemo(
    () => { return [column_structure, order_history] },
    [order_history]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,// @ts-ignore
    page,// @ts-ignore
    canPreviousPage,// @ts-ignore
    canNextPage,// @ts-ignore
    pageOptions,// @ts-ignore
    pageCount,// @ts-ignore
    gotoPage,// @ts-ignore
    nextPage,// @ts-ignore
    previousPage,// @ts-ignore
    setPageSize,// @ts-ignore
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data },
    useSortBy, usePagination 
  );

  return (
    <div className=' h-full w-[95%] font-code'>
      <table
        className=' w-full text-sm text-left text-gray-500 dark:text-gray-500'
        {...getTableProps()}
      >
        <thead
          className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
        >
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className=' px-6 py-3'
                >
                  <div className=' flex flex-row w-full justify-between'>
                    {column.render('Header')}
                    <span>
                      {column.isSorted && (column.isSortedDesc ? <SortDescending size={15}  /> : <SortAscending size={15} />)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row)
            return (
              <tr
                className=' border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className=' px-6 py-4 font-medium text-gray-50 dark:text-white whitespace-nowrap'
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination flex flex-row justify-end mt-2 w-full h-fit">
        <Button
          variant='outline'
          onClick={() => gotoPage(0)} disabled={!canPreviousPage}
        >
          <FirstPage size={20} />
        </Button>
        <Button
          variant='outline'
          onClick={() => previousPage()} disabled={!canPreviousPage}
        >
          <NavigateBefore size={20} />
        </Button>

        <span className=' mx-2 flex flex-row justify-center items-center h-full text-gray-50'>
          <p className=' mr-1 mt-1 h-full'>Página</p>
          <p className=' mt-1 font-bold h-full'>{pageIndex + 1} de {pageOptions.length}</p>
        </span>

        <Button
          variant='outline'
          onClick={() => nextPage()} disabled={!canNextPage}
        >
          <NavigateNext size={20} />
        </Button>
        <Button
          variant='outline'
          onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
        >
          <LastPage size={20} />
        </Button>

        <Select
          placeholder="Mostrar"
          value={pageSize}
          onChange={setPageSize}
          data={[
            { value: "10", label: `Mostrar 10` },
            { value: "20", label: `Mostrar 20` },
            { value: "30", label: `Mostrar 30` },
            { value: "40", label: `Mostrar 40` },
            { value: "50", label: `Mostrar 50` },
          ]}
        />
      </div>
    </div>
  );
}

export default HistoryTable;