import { Eye } from 'lucide-react'
import type { PropsWithChildren, HTMLAttributes } from 'react'
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
        <Cell className='p-0 aspect-square h-8 cursor-pointer' {...props}>
          <a href={profile_url} target='_blank' referrerPolicy='no-referrer'>
            <img src={url} alt={alt} className=' object-fill rounded-full'/>
          </a>
        </Cell>
    )
}


type LinkCellProps = {
  url: string
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>
export function LinkCell({ url, ...props }: LinkCellProps) {
  return (
    <Cell className='cursor-pointer' {...props}>
      <a href={url} target='_blank' referrerPolicy='no-referrer'>
        <Eye />
      </a>
    </Cell>
  )
}