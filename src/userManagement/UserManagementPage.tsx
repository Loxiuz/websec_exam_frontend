import { useEffect, useState } from "react";
import type { AdminUserEmployeeResponse } from "../types";
import { getUsersWithEmployees } from "../api/userApi";
import "./UserManagementPage.css";

export default function UserManagementPage() {
  const [usersWithEmployees, setUsersWithEmployees] = useState<
    AdminUserEmployeeResponse[]
  >([]);

  useEffect(() => {
    const fetchUsersWithEmployees = async () => {
      try {
        const users = await getUsersWithEmployees();
        setUsersWithEmployees(users);
      } catch (error) {
        console.error("Error fetching users with employees:", error);
      }
    };
    fetchUsersWithEmployees();
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      <table id="user-management-table">
        <thead id="user-management-table-header">
          <tr>
            <th>Potrait</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody id="user-management-table-body">
          {usersWithEmployees.map((user, i) => (
            <tr key={user.role + `${i}`}>
              <td>
                <img src="" alt="Portrait" />
              </td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
