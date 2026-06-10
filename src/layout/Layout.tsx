import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../constants/menuItems";
import "./Layout.css";
import { logout } from "../api/authApi";
import readSessionString from "../auth/ReadSessionString";

export default function Layout() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const username = readSessionString("username");

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
    try {
      await logout();
      sessionStorage.removeItem("userPermissions");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("employeeId");
      navigate("/login");
      globalThis.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <div id="layout">
      <nav id="menuBar">
        <ul>
          <li>
            <p>Logged in as: {username}</p>
          </li>
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
