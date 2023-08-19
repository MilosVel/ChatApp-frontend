import { io } from "socket.io-client";
import React from "react";

export const socket = io(process.env.REACT_APP_URL);
// app context
export const AppContext = React.createContext();
