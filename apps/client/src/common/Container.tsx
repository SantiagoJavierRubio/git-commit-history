import { PropsWithChildren } from 'react'

export default function Container({ ...props }: PropsWithChildren) {
  return (
    <section className="max-h-screen h-screen max-w-6xl w-full overflow-y-auto p-4 no-scrollbar">{props.children}</section>
  )
}
