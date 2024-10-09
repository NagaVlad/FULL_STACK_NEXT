"use client"
import { useWSContext } from '@/contexts/ws/useContext';
import { useState, useEffect, useMemo } from 'react';

export default function Ws() {

  const webSocket = useWSContext()

  const [users, setUsers] = useState<{ id?: number, email?: string }[]>([]);

  useEffect(() => {
    //@ts-ignore
    webSocket.send(JSON.stringify({ "event": "get-users" })); //! Если не JSON.stringify

    //@ts-ignore
    webSocket.onmessage = (event) => {
      console.log('onmessage', event.data);

      // console.log('event.data', event.data);
      setUsers(JSON.parse(event.data).users)
    };

  }, [webSocket]);

  const sendMessage = () => {
    //@ts-ignore
    // webSocket.send({ "event": "get-users" }); 
    webSocket.send(JSON.stringify({ "event": "get-users" })); //! Если не JSON.stringify
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {users?.map((user, index) => (
          <div key={index}>{user?.id} {user?.email}</div>
        ))}
      </div>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

