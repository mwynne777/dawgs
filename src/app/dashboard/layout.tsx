export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-8 pt-4 md:px-16 lg:px-24">{children}</div>;
}
