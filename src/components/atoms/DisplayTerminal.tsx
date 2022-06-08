import React, { useState, useContext, useEffect, useRef } from 'react';
import { format } from 'date-fns';

import { SocketContext } from '../../context/socket';
import useFetchLogs from '../../hooks/useFetchLogs';

import { Log } from '../../interfaces';

const DisplayTerminal: React.FunctionComponent = () => {
  const socket = useContext(SocketContext);
  const [logs, setLogs] = useState<Log[]>();
  const endDiv = useRef(null);

  socket.emit('connected-from', 'terminal');
  
  socket.on('order_update', async () => {
    const refetcher: any = await refetch();
    setLogs(refetcher.data);
  });

  const { isError, isLoading, refetch, data } = useFetchLogs();

  useEffect(() => {
    setLogs(data);
  }, [data]);
  
  useEffect(() => {
    //@ts-ignore
    if (typeof endDiv !== "undefined" && endDiv !== null) endDiv.current?.scrollIntoView();
  },[logs]);

  if(isError) {
    return <p>Error!</p>
  } else if(isLoading) {
    return <p>Success!</p>
  } else {
    return (
      <div
        className=" w-full h-full bg-gray-900 pl-5 pt-5 max-h-full overflow-y-scroll scrollbar scroll-smooth"
      >
        {
          typeof logs !== "undefined" &&
          logs.map((curr_msg: Log) => {
            const { date_time, log, id }: { date_time: string, log: string, id: number } = curr_msg;
  
            return (
              <div
                key={id}
                className=" flex flex-row flex-wrap justify-start content-start w-full text-gray-50 font-code border-green-600 border-l-4 mb-1"
              >
                <p className=" ml-2">bobinator_server:</p>
                <p className=" ml-2 text-yellow-300">{` [${format(new Date(date_time), "yyyy-MM-dd HH:mm:ss")}]`}</p>
                <p className=" ml-2 text-blue-600">{`>`}</p>
                <p className=" ml-2">{log}</p>
              </div>
            );
          })
        }
        <div ref={endDiv}/>
      </div>
    );
  }
};

export default DisplayTerminal;
