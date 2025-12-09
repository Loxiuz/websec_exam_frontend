import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../constants/menuItems";
import "./Layout.css";

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

  return (
    <div id="layout">
      <nav id="menuBar">
        <ul>
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
