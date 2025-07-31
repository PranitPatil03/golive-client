import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="min-h-screen w-full flex items-center justify-center relative bg-accent">
    <div className="absolute top-6 left-6 z-10">
      <Image
        src="/golive.svg"
        alt="Limitless"
        width={120}
        height={40}
        className="dark:hidden"
      />
      <Image
        src="/golive.svg"
        alt="Limitless"
        width={120}
        height={40}
        className="hidden dark:block"
      />
    </div>
    {children}
  </div>
);

export default Layout;
