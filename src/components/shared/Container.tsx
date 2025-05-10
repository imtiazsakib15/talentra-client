import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
