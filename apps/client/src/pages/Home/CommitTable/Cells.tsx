import { Eye } from 'lucide-react'
import type { PropsWithChildren, HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { twMerge } from 'tailwind-merge'

export function Cell({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={twMerge('py-5 px-2', className)} {...props}>{children}</div>
  )
}

type AvatarCellProps = {
    url: string
    alt: string
    profile_url: string
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>
export function AvatarCell({ url, alt, profile_url, ...props }: AvatarCellProps) {
  return (
        <>
        <Cell className='p-0 aspect-square h-8 cursor-pointer group' {...props}>
          <a href={profile_url} target='_blank' referrerPolicy='no-referrer' rel="noreferrer">
            <img
              data-tooltip-id='profile_link'
              data-tooltip-content='Go to profile'
              src={url}
              alt={alt}
              className=' object-fill rounded-full group-hover:scale-110 transition-all'
              />
          </a>
        </Cell>
        <Tooltip id='profile_link' />
        </>
  )
}

type LinkCellProps = {
  url: string
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>
export function LinkCell({ url, ...props }: LinkCellProps) {
  return (
    <>
    <Cell className='cursor-pointer group' {...props}>
      <a href={url} target='_blank' referrerPolicy='no-referrer' rel="noreferrer">
        <Eye
          data-tooltip-id='gh_link'
          data-tooltip-content='Inspect on Github'
          className='group-hover:stroke-[2.5] group-hover:scale-105 transition-all
          stroke-textDark group-hover:stroke-textLight outline-none'
        />
      </a>
    </Cell>
    <Tooltip id='gh_link' className='text-red-500' />
    </>
  )
}
