interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: AuthLayoutProps) {
  return <>{children}</>;
}
