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
import { AvatarCell, Cell, LinkCell } from './Cells'

const columnHelper = createColumnHelper<CommitListElement>()
const columns = [
  columnHelper.accessor('sha', { header: () => <span>ID</span>, cell: props => <Cell>{props.getValue().substring(0, 7)}</Cell> }),
  columnHelper.group({
    id: 'author',
    columns: [
      columnHelper.display({ id: 'avatar', header: () => null, cell: props => <AvatarCell url={props.row.original.author.avatar_url} alt={`${props.row.original.commit.author.name}'s avatar`} profile_url={props.row.original.author.html_url} /> }),
      columnHelper.accessor('commit.author.name', { id: 'name', header: () => <div className='text-center pr-16'>Author</div>, cell: props => <Cell className='whitespace-nowrap'>{props.getValue()}</Cell> }),
      columnHelper.accessor('commit.author.email', { id: 'email', header: () => null, cell: () => null })
    ]
  }),
  columnHelper.accessor('commit.message', { id: 'message', enableSorting: false, header: () => <span>Message</span>, cell: props => <Cell className='text-sm italic whitespace-pre-wrap leading-3'>{props.row.original.commit.message}</Cell> }),
  columnHelper.accessor('commit.author.date', { id: 'date', header: () => <div className='pr-4'>Date</div>, cell: props => <Cell className='text-sm'>{new Date(props.getValue()).toLocaleDateString()}</Cell> }),
  columnHelper.display({ id: 'link', cell: props => <LinkCell url={props.row.original.html_url} /> })
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
      <table className='ring-white ring-2 bg-gray-500 rounded-lg w-full overflow-hidden'>
          <thead className='bg-gray-500 p-4 h-10'>
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
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} onClick={() => console.log(row.getValue('sha'))} className={`${i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-500'}`}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4'>
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
