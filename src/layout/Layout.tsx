import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../constants/menuItems";
import "./Layout.css";
import { logout } from "../api/authApi";

export default function Layout() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  function renderMenuList(path: string, label: string) {
    if (pathname === path) {
      return (
        <li key={label}>
          <button
            onClick={() => {
              navigate(path);
            }}
            className="menuListItemActive"
          >
            {label}
          </button>
        </li>
      );
    } else {
      return (
        <li key={label}>
          <button
            onClick={() => {
              navigate(path);
            }}
          >
            {label}
          </button>
        </li>
      );
    }
  }

  async function handleLogout() {
    const response = await logout();
    if (response.message) {
      navigate("/login");
      globalThis.location.reload();
    } else {
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <div id="layout">
      <nav id="menuBar">
        <ul>
          <li key={"logout"}>
            <button
              onClick={async () => {
                await handleLogout();
              }}
            >
              Logout
            </button>
          </li>
          {MENU_ITEMS.map(([path, label]) => {
            return renderMenuList(`${path}`, label);
          })}
        </ul>
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </div>
  );
}
