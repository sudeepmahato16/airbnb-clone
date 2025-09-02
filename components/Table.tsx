"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { motion } from "framer-motion";

import { usePrevious } from "@/hooks/usePrevious";
import { Loader } from "./Loader";

const fadeIn = (duration: number, initialOpacity = 0) => ({
  hidden: {
    opacity: initialOpacity,
  },
  show: {
    opacity: 1,
    transition: {
      duration,
      ease: "easeIn",
      type: "tween",
    },
  },
});

interface TableProps {
  columns: string;
  children: ReactNode;
  className?: string;
}

const TableContext = createContext({
  columns: "",
});

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <header
      style={{
        gridTemplateColumns: columns,
      }}
      className={`grid items-center gap-x-6 table-heading rounded-tr-[6px] rounded-tl-[6px]`}
      role="row"
    >
      {children}
    </header>
  );
};

interface BodyProps {
  data: any[];
  render: (item: any) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
}

const Body: React.FC<BodyProps> = ({
  data,
  render,
  isLoading = false,
  emptyMessage = "No data to show at the moment",
}) => {
  const previousData = usePrevious(data);

  return (
    <section
      className={`pt-1 relative ${
        (!data || data.length === 0) && !previousData
          ? "min-h-[512px]"
          : "h-full"
      }`}
    >
      {/* {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[1] bg-[rgba(255,255,255,0.4)]">
          <Loader />
        </div>
      )} */}
      {(data || previousData || []).map(render)}
      {!isLoading && data?.length === 0 && (
        <div className="w-full h-[512px] flex items-center justify-center">
          <p className="text-[16px] font-medium text-center m-6 text-gray-600">
            {emptyMessage}
          </p>
        </div>
      )}
    </section>
  );
};

const Row = ({ children }: { children: ReactNode }) => {
  const { columns } = useContext(TableContext);

  return (
    <motion.div
      // variants={fadeIn(0.3, 0.4)}
      animate="show"
      initial="hidden"
      style={{
        gridTemplateColumns: columns,
      }}
      className={`grid items-center gap-x-6 transition-none py-2 px-6 border-b text-gray-800 border-gray-200 `}
      role="row"
    >
      {children}
    </motion.div>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="bg-gray-50  flex justify-center p-3 [&:not(:has(*))]:hidden rounded-br-[6px] rounded-bl-[6px] ">
      {children}
    </footer>
  );
};

const Table: React.FC<TableProps> & {
  Header: typeof Header;
  Row: typeof Row;
  Body: typeof Body;
  Footer: typeof Footer;
} = ({ columns, children, className }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className={`table ${className}`} role="table">
        {children}
      </div>
    </TableContext.Provider>
  );
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
