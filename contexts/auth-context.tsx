"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const getUser = useCallback(async () => {
        try {
            setLoading(true);
            const {
                data: { user: authUser },
            } = await supabase.auth.getUser();

            if (!authUser) {
                setUser(null);
                return;
            }

            const { data: userData, error } = await supabase
                .from("profiles")
                .select(
                    `id,
                    first_name,
                    last_name,
                    avatar_url,
                    role:role_id (name)
                    `
                )
                .eq("id", authUser.id)
                .single();
                
            if (error) {
                console.error("Error fetching user data:", error);
                setUser(authUser);
                return;
            }

            if (userData) {
                setUser({
                    ...authUser,
                    user_metadata: {
                        ...authUser.user_metadata,
                        ...userData,
                    },
                });
            } else {
                console.warn("No profile found for user:", authUser.id);
                setUser(authUser);
            }
        } catch (error) {
            console.error("Error getting user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                getUser();
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [getUser, supabase.auth]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signOut,
                getUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
