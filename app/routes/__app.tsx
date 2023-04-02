import { Link, Outlet } from "@remix-run/react";

export default function App() {
  return (
    <div>
      <p>
        <Link to=".">Home</Link> | <Link to="accounts">Accounts</Link> |{" "}
        <Link to="asset-classes">Asset Classes</Link>
      </p>
      <Outlet />
    </div>
  );
}
