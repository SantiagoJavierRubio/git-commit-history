import { PropsWithChildren } from 'react'

export default function Container({ ...props }: PropsWithChildren) {
  return (
    <div className="max-h-screen h-screen max-w-5xl w-full overflow-y-auto p-4 no-scrollbar">{props.children}</div>
  )
}
