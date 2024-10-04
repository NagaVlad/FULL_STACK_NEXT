
export default function PostLayout({
   children,
   details
}: {
   children: React.ReactNode,
   details: React.ReactNode
}) {
   return (
      <>
         <div>{children}</div>
         <div>{details}</div>
      </>
   )
}

