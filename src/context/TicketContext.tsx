import { createContext, useState } from "react";

interface TicketContextType {
  createTicket: boolean;
  setCreateTicket: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ticketContext = createContext<TicketContextType>({
  createTicket: false,
  setCreateTicket: () => {},
});

interface TicketProviderProps {
  children: React.ReactNode;
}

export const TicketProvider = (props: TicketProviderProps) => {
  const [createTicket, setCreateTicket] = useState<boolean>(false);

  return (
    <ticketContext.Provider value={{ createTicket, setCreateTicket }}>
      {props.children}
    </ticketContext.Provider>
  );
};
