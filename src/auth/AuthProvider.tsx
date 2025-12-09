import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginResponse } from "../types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<LoginResponse | null>(null);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};