"use client";

import type { Team } from "better-auth/plugins";
import React from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authClient } from "@/lib/auth-client";

// Team store state interface
interface TeamState {
    // State
    teams: Team[];
    activeTeam: Team | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setTeams: (teams: Team[]) => void;
    setActiveTeam: (team: Team | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Team management functions
    fetchTeams: (organizationId?: string) => Promise<void>;
    createTeam: (name: string, organizationId?: string) => Promise<Team | null>;
    updateTeam: (teamId: string, data: { name: string }) => Promise<Team | null>;
    removeTeam: (teamId: string, organizationId?: string) => Promise<boolean>;
    switchTeam: (team: Team) => void;
    clearTeams: () => void;
}

// Create the team store with Zustand
export const useTeamStore = create<TeamState>()(
    persist(
        (set, get) => {
            // Helper function to handle active team logic
            const handleActiveTeamLogic = (teams: Team[]) => {
                const { activeTeam } = get();

                // If we have no teams, clear active team
                if (teams.length === 0) {
                    if (activeTeam) {
                        set({ activeTeam: null });
                    }
                    return;
                }

                // If we have no active team, set the first one
                if (!activeTeam) {
                    set({ activeTeam: teams[0] });
                    return;
                }

                // If we have an active team, check if it still exists
                const teamExists = teams.find((team) => team.id === activeTeam.id);
                if (!teamExists) {
                    // Active team no longer exists, fallback to first team
                    set({ activeTeam: teams[0] });
                }
                // If team exists, keep the current active team (don't change it)
            };

            return {
                // Initial state
                teams: [],
                activeTeam: null,
                isLoading: false,
                error: null,

                // Basic setters
                setTeams: (teams) => set({ teams }),
                setActiveTeam: (activeTeam) => set({ activeTeam }),
                setLoading: (isLoading) => set({ isLoading }),
                setError: (error) => set({ error }),

                // Fetch teams for an organization
                fetchTeams: async (organizationId) => {
                    const { setLoading, setTeams, setError } = get();

                    setLoading(true);
                    setError(null);

                    try {
                        const result = await authClient.organization.listTeams({
                            query: {
                                organizationId,
                            },
                        });

                        if (result.data) {
                            const teams = result.data as Team[];
                            setTeams(teams);

                            // Only handle active team logic if we don't have a persisted active team
                            // or if the current active team doesn't exist in the new teams list
                            const { activeTeam } = get();
                            if (
                                !(activeTeam && teams.find((team) => team.id === activeTeam.id))
                            ) {
                                handleActiveTeamLogic(teams);
                            }
                        } else {
                            setError(result.error?.message || "Failed to fetch teams");
                        }
                    } catch (error) {
                        setError(
                            error instanceof Error ? error.message : "An error occurred"
                        );
                    } finally {
                        setLoading(false);
                    }
                },

                // Create a new team
                createTeam: async (name, organizationId) => {
                    const { setLoading, setError, fetchTeams } = get();

                    setLoading(true);
                    setError(null);

                    try {
                        const result = await authClient.organization.createTeam({
                            name,
                            organizationId,
                        });

                        if (result.data) {
                            toast.success(`Team "${name}" created successfully`);
                            // Refresh teams list
                            await fetchTeams(organizationId);
                            return result.data as Team;
                        }
                        const errorMsg = result.error?.message || "Failed to create team";
                        setError(errorMsg);
                        toast.error(errorMsg);
                        return null;
                    } catch (error) {
                        const errorMsg =
                            error instanceof Error ? error.message : "An error occurred";
                        setError(errorMsg);
                        toast.error(errorMsg);
                        return null;
                    } finally {
                        setLoading(false);
                    }
                },

                // Update an existing team
                updateTeam: async (teamId, data) => {
                    const { setLoading, setError, fetchTeams } = get();

                    setLoading(true);
                    setError(null);

                    try {
                        const result = await authClient.organization.updateTeam({
                            teamId,
                            data,
                        });

                        if (result.data) {
                            toast.success(`Team "${data.name}" updated successfully`);
                            // Refresh teams list
                            await fetchTeams();
                            return result.data as Team;
                        }
                        const errorMsg = result.error?.message || "Failed to update team";
                        setError(errorMsg);
                        toast.error(errorMsg);
                        return null;
                    } catch (error) {
                        const errorMsg =
                            error instanceof Error ? error.message : "An error occurred";
                        setError(errorMsg);
                        toast.error(errorMsg);
                        return null;
                    } finally {
                        setLoading(false);
                    }
                },

                // Remove a team
                removeTeam: async (teamId, organizationId) => {
                    const { setLoading, setError, fetchTeams, activeTeam } = get();

                    setLoading(true);
                    setError(null);

                    try {
                        const result = await authClient.organization.removeTeam({
                            teamId,
                            organizationId,
                        });

                        if (result.data) {
                            toast.success("Team removed successfully");

                            // If the removed team was active, clear it
                            if (activeTeam?.id === teamId) {
                                set({ activeTeam: null });
                            }

                            // Refresh teams list
                            await fetchTeams(organizationId);
                            return true;
                        }
                        const errorMsg = result.error?.message || "Failed to remove team";
                        setError(errorMsg);
                        toast.error(errorMsg);
                        return false;
                    } catch (error) {
                        const errorMsg =
                            error instanceof Error ? error.message : "An error occurred";
                        setError(errorMsg);
                        toast.error(errorMsg);
                        return false;
                    } finally {
                        setLoading(false);
                    }
                },

                // Switch to a different team
                switchTeam: (team) => {
                    set({ activeTeam: team });
                    toast.success(`Switched to team "${team.name}"`);
                },

                // Clear all teams (useful for logout)
                clearTeams: () => {
                    set({ teams: [], activeTeam: null, error: null });
                },
            };
        },
        {
            name: "team-storage", // localStorage key
            partialize: (state) => ({
                activeTeam: state.activeTeam,
            }), // Only persist active team
            onRehydrateStorage: () => (state) => {
                // Ensure the active team is properly loaded
                if (state?.activeTeam) {
                    // Force update the state to ensure it's properly set
                    state.setActiveTeam(state.activeTeam);
                }
            },
        }
    )
);

// React hook for using the team store
export const useTeam = () => {
    const store = useTeamStore();
    const { data: activeOrganization } = authClient.useActiveOrganization();

    // Auto-fetch teams when organization changes and store is hydrated
    React.useEffect(() => {
        if (activeOrganization?.id) {
            store.fetchTeams(activeOrganization.id);
        }
    }, [activeOrganization?.id, store]);

    return store;
};

// Team provider component for React context
interface TeamProviderProps {
    children: React.ReactNode;
}

export function TeamProvider({ children }: TeamProviderProps) {
    const { data: activeOrganization } = authClient.useActiveOrganization();
    const { fetchTeams, clearTeams } = useTeamStore();

    // Auto-fetch teams when organization changes
    React.useEffect(() => {
        if (activeOrganization?.id) {
            fetchTeams(activeOrganization.id);
        } else {
            // Clear teams when no organization is active
            clearTeams();
        }
    }, [activeOrganization?.id, fetchTeams, clearTeams]);

    return <>{children}</>;
}

// Utility hooks for specific use cases
export const useActiveTeam = () => {
    const { activeTeam, isLoading } = useTeamStore();
    return { activeTeam, isLoading };
};

export const useTeams = () => {
    const { teams, isLoading, error } = useTeamStore();
    return { teams, isLoading, error };
};

export const useTeamActions = () => {
    const { createTeam, updateTeam, removeTeam, switchTeam } = useTeamStore();
    return { createTeam, updateTeam, removeTeam, switchTeam };
};
