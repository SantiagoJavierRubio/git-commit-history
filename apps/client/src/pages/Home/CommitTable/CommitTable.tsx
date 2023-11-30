/* eslint-disable no-console */
import { ChangeEvent, useState } from 'react'
import { CommitListElement } from 'types'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState
} from '@tanstack/react-table'

import useDebounce from '@/hooks/useDebounce'

const columnHelper = createColumnHelper<CommitListElement>()
const columns = [
  columnHelper.accessor('sha', { header: () => <span>Id</span>, cell: props => <span>{props.getValue().substring(0, 7)}</span> }),
  columnHelper.group({
    id: 'author',
    columns: [
      columnHelper.display({ id: 'avatar', cell: props => <img src={props.row.original.author.avatar_url} alt={`${props.row.original.commit.author.name}'s avatar`} className='aspect-square rounded-full w-6'/> }),
      columnHelper.accessor('commit.author.name', { id: 'name', header: () => <span>Author</span>, cell: props => <span>{props.getValue()}</span> }),
      columnHelper.accessor('commit.author.email', { id: 'email', header: () => null, cell: () => null })
    ]
  }),
  columnHelper.accessor('commit.message', { id: 'message', enableSorting: false, header: () => <span>Message</span>, cell: props => <span>{props.row.original.commit.message}</span> }),
  columnHelper.accessor('commit.author.date', { id: 'date', header: () => <span>Date</span>, cell: props => <span>{new Date(props.getValue()).toLocaleDateString()}</span> })
]
export default function CommitTable({ commits }: { commits: CommitListElement[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [filtering, setFiltering] = useState<string>('')

  const filter = useDebounce(filtering, 250)

  const table = useReactTable({
    data: commits,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  })

  const handleSortInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFiltering(e.target.value)
  }

  return (
    <>
    <input type="text" name="filter" onChange={handleSortInput} value={filtering} />
    <p>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
      <table>
        <thead>
          {table.getHeaderGroups().map(hGroup => (
            <tr key={hGroup.id}>
              {hGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-default'} onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => console.log(row.getValue('sha'))} >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>previous</button>
        <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>next</button>
        <label htmlFor='pageSize'>Size</label>
        <select id="pageSize" name="page-size" onChange={(e) => table.setPageSize(parseInt(e.target.value))}>
          <option defaultChecked value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </>
  )
}
