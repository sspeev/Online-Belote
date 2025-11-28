// import { useEffect, type DependencyList } from 'react';
// import { hubs } from '@/services/signalRService'; // adjust path to your signalR service
//
// type UseHubProps = {
//   hub: {
//     connectionName: string;
//     methodName: string;
//     onReceived: (payload: never) => void | Promise<void>;
//   };
//   condition?: boolean;
//   deps?: DependencyList;
// };
//
// export const useHub = ({ hub, condition, deps }: UseHubProps) =>
//   useEffect(() => {
//     if (condition === undefined || condition) {
//       const connection = hubs.buildConnection(hub.connectionName);
//
//       const init = async () => {
//         connection.on(hub.methodName, hub.onReceived);
//         await hubs.start(connection);
//       };
//       init();
//
//       return () => {
//         hubs.stop(connection);
//       };
//     }
//   }, deps);
