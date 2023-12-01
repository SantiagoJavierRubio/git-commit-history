import { ChangeEvent, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowBigLeft, ArrowBigRight, Search } from "lucide-react";
import type { CommitListElement } from "types";

import useDebounce from "@/hooks/useDebounce";
import { AvatarCell, Cell, LinkCell } from "./Cells";
import { SortableHeader, Header } from "./Headers";

const columnHelper = createColumnHelper<CommitListElement>();
const columns = [
  columnHelper.accessor("sha", {
    header: (props) => (
      <SortableHeader
        sortingType="alphabetical"
        sortDirection={props.column.getIsSorted()}
      >
        ID
      </SortableHeader>
    ),
    cell: (props) => (
      <Cell id={props.getValue()} className="text-center">
        {props.getValue().substring(0, 7)}
      </Cell>
    ),
  }),
  columnHelper.group({
    id: "author",
    columns: [
      columnHelper.display({
        id: "avatar",
        header: () => null,
        cell: (props) => (
          <AvatarCell
            url={props.row.original.author.avatar_url}
            alt={`${props.row.original.commit.author.name}'s avatar`}
            profile_url={props.row.original.author.html_url}
          />
        ),
      }),
      columnHelper.accessor("commit.author.name", {
        id: "name",
        header: (props) => (
          <SortableHeader
            sortingType="alphabetical"
            sortDirection={props.column.getIsSorted()}
            className="text-left pr-16"
          >
            Author
          </SortableHeader>
        ),
        cell: (props) => (
          <Cell className="whitespace-nowrap">{props.getValue()}</Cell>
        ),
      }),
      columnHelper.accessor("commit.author.email", {
        id: "email",
        header: () => null,
        cell: () => null,
      }),
    ],
  }),
  columnHelper.accessor("commit.message", {
    id: "message",
    enableSorting: false,
    header: () => <Header>Message</Header>,
    cell: (props) => (
      <Cell className="text-sm italic whitespace-pre-wrap leading-3">
        {props.row.original.commit.message}
      </Cell>
    ),
  }),
  columnHelper.accessor("commit.author.date", {
    id: "date",
    header: (props) => (
      <SortableHeader
        sortingType="date"
        sortDirection={props.column.getIsSorted()}
        className="pr-4"
      >
        Date
      </SortableHeader>
    ),
    cell: (props) => (
      <Cell className="text-sm text-center">
        {new Date(props.getValue()).toLocaleDateString()}
      </Cell>
    ),
  }),
  columnHelper.display({
    id: "link",
    cell: (props) => <LinkCell url={props.row.original.html_url} />,
  }),
];
export default function CommitTable({
  commits,
}: {
  commits: CommitListElement[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<string>("");

  const filter = useDebounce(filtering, 250);

  const table = useReactTable({
    data: commits,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleSortInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFiltering(e.target.value);
  };

  return (
    <>
      <div
        className="flex items-center justify-between my-4 pr-2"
        id="actions-top"
      >
        <label
          htmlFor="filter"
          className="flex items-center justify-start gap-2 bg-bgLight w-fit focus-within:ring-2 ring-textLight px-2 py-1 rounded-lg"
        >
          <Search size={20} strokeWidth={3} />
          <input
            type="text"
            id="filter"
            name="filter"
            onChange={handleSortInput}
            value={filtering}
            className="bg-transparent outline-none text-textLight"
          />
        </label>
        <p>
          Page{" "}
          {table.getState().pagination.pageIndex + table.getPageCount() > 0
            ? 1
            : 0}{" "}
          of {table.getPageCount()}
        </p>
      </div>
      <table
        className="ring-textLight ring-2 bg-bgLight rounded-lg w-full overflow-hidden text-textLight"
        id="commits-table"
      >
        <thead>
          {table.getHeaderGroups().map((hGroup) => (
            <tr key={hGroup.id}>
              {hGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "cursor-default"
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-bgDark border-y-2 border-textLight hover:bg-bgMedium/70"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <td colSpan={20}>
              <Cell className="bg-bgDark text-center py-8 text-xl">
                No results
              </Cell>
            </td>
          )}
        </tbody>
      </table>
      <div
        className="mt-4 w-full flex items-center justify-end gap-8 pr-2"
        id="actions-bottom"
      >
        <label htmlFor="pageSize" className="flex items-center gap-4">
          <p>Show</p>
          <select
            id="pageSize"
            name="page-size"
            onChange={(e) => table.setPageSize(parseInt(e.target.value))}
          >
            <option defaultChecked value={10}>
              10
            </option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
        <div id="page-navigation" className="flex items-center gap-6">
          <button
            className="flex items-center gap-1 p-1 bg-bgLight disabled:opacity-25 rounded-lg"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ArrowBigLeft size={24} />
          </button>
          <button
            className="flex items-center gap-1 p-1 bg-bgLight disabled:opacity-25 rounded-lg"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ArrowBigRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
