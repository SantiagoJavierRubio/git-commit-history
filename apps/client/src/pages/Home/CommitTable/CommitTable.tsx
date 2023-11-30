/* eslint-disable no-console */
import { CommitListElement } from 'types'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'

const columnHelper = createColumnHelper<CommitListElement>()
const columns = [
  columnHelper.accessor('sha', { header: () => <span>Id</span>, cell: props => <span>{props.getValue().substring(0, 7)}</span> }),
  columnHelper.accessor('commit.author.email', { id: 'author', header: () => <span>Author</span>, cell: props => <span>{props.row.original.commit.author.name}</span> }),
  columnHelper.display({ id: 'message', header: () => <span>Message</span>, cell: props => <span>{props.row.original.commit.message}</span> }),
  columnHelper.accessor('commit.author.date', { id: 'date', header: () => <span>Date</span>, cell: props => <span>{new Date(props.getValue()).toLocaleDateString()}</span> })
]
export default function CommitTable({ commits }: { commits: CommitListElement[] }) {
  const table = useReactTable({ data: commits, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel() })
  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map(hGroup => (
            <tr key={hGroup.id}>
              {hGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
