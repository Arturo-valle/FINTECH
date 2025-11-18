// This layout can be used to protect admin routes
// based on user role in a real application.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
