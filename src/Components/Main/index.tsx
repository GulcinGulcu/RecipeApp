import './styles.css';

interface MainProps {
  children: React.ReactNode;
  className: string;
}

export const Main = ({ children, className }: MainProps) => {
  return <main className={className}>{children}</main>;
};
