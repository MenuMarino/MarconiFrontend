import React, { useMemo } from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import PropTypes from 'prop-types';
import { Filter } from './filter';
import next from '../assets/Artboard 19db.png';
import previous from '../assets/Artboard 18db.png';
import nextDisabled from '../assets/next-gris.png';
import previousDisabled from '../assets/pre-gris.png';
import '../styles/table.css';

function Table({ products, headers, redirect }) {
  function CreateTable() {
    const data = useMemo(() => products, []);
    const columns = useMemo(() => headers, []);

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      prepareRow,
      state,
      setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        initialState: { pageSize: 10 },
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

    const { globalFilter } = state;

    const handleRowClick = (row) => {
      if (redirect) {
        // const { userId, ...values } = row.original;
        // navigate(`/edit/user/${userId}`, { state: { ...values } });
      }
    };

    return (
      <>
        <div style={{ padding: '50px' }}>
          <div style={{ paddingBottom: '20px' }}>
            <Filter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="table">
              <table {...getTableProps()} className="center">
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <>
                      <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                          <>
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              key={index}
                            >
                              {column.render('Header')}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                  : ' '}
                              </span>
                            </th>
                          </>
                        ))}
                      </tr>
                    </>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <>
                        <tr
                          onClick={() => handleRowClick(row)}
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell, index) => {
                            return (
                              <>
                                <td {...cell.getCellProps()} key={index}>
                                  {cell.render('Cell')}
                                </td>
                              </>
                            );
                          })}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ textAlign: 'center' }}>
                <div style={{ padding: '20px', display: 'inline-block' }}>
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    style={{
                      width: '130px',
                      height: '42px',
                      background: canPreviousPage
                        ? `url(${previous}) 100%`
                        : `url(${previousDisabled}) 100%`,
                      backgroundRepeat: 'no-repeat',
                      outline: 'none',
                    }}
                  ></button>
                </div>

                <div style={{ padding: '20px', display: 'inline-block' }}>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    style={{
                      width: '115px',
                      height: '42px',
                      background: canNextPage
                        ? `url(${next}) no-repeat 100%`
                        : `url(${nextDisabled}) no-repeat 100%`,
                      outline: 'none',
                    }}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Render the UI for your table
  return CreateTable();
}

Table.propTypes = {
  products: PropTypes.array,
  headers: PropTypes.array,
  redirect: PropTypes.bool,
};

export default Table;
