'use client'
export default function Error({ error, reset }: any) {
   return <div>
      {error}
      <button onClick={reset}>Reset</button>
   </div>
}