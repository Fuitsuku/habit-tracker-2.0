import { useState, useEffect } from 'react';

// Define the types for the user profile
type Task = {
    "task-id": string;
    id: number;
    title: string;
    completed: boolean;
};
  
type Reward = {
    "reward-id": string;
    id: number;
    name: string;
    "point-value": number;
};

type UserStats = {
    "performance-score": number;
    negation: number;
    points: number,
    "user-id": string;
}

type UserProfile = {
    stats: UserStats;
    tasks: Task[];
    rewards: Reward[];
};

function useUserProfile(): [
    UserProfile | null,
    (key: keyof UserProfile, data: any) => void
] {
    // Initialize the profile state
    const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
        const storedProfile = localStorage.getItem('userProfile');
        return storedProfile ? (JSON.parse(storedProfile) as UserProfile) : null;
    }
    return null;
    });

    // Save to local storage whenever profile changes
    useEffect(() => {
    if (typeof window !== 'undefined' && profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }
    }, [profile]);

    // Update a specific portion of the profile
    const updateProfile = (key: keyof UserProfile, data: any) => {
    setProfile((prev) => {
        if (!prev) return null;
        return {
        ...prev,
        [key]: data,
        };
    });
    };

  return [profile, updateProfile];
}

export default useUserProfile;