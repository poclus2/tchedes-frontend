import { useQuery } from '@tanstack/react-query';
import { fetchSessions, fetchSession } from '@/lib/api';

export function useSessions() {
    return useQuery({
        queryKey: ['sessions'],
        queryFn: fetchSessions,
        staleTime: 30000, // 30 seconds
    });
}

export function useSession(id: string) {
    return useQuery({
        queryKey: ['session', id],
        queryFn: () => fetchSession(id),
        staleTime: 30000, // 30 seconds
        enabled: !!id,
    });
}
