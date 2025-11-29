import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { LayoutProps } from "../types";
import { MENU_ITEMS } from "../constants/menuItems";
import "./Layout.css";

export default function Layout({ children }: Readonly<LayoutProps>) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { employeeId } = useParams();

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

  if (!employeeId) return null;

  return (
    <div id="layout">
      <nav id="menuBar">
        <ul>
          {MENU_ITEMS.map(([path, label]) => {
            return renderMenuList(`/${employeeId}${path}`, label);
          })}
        </ul>
      </nav>
      <div id="content">{children}</div>
    </div>
  );
}
