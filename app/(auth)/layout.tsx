interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="min-h-screen w-full flex items-center justify-center relative bg-accent font-mono">
    {children}
  </div>
);

export default Layout;
