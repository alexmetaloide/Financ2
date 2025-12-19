import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Service, Withdrawal } from '../types';

export function useServices(userId: string | undefined) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setServices([]);
            setLoading(false);
            return;
        }

        fetchServices();

        // Realtime subscription
        const channel = supabase
            .channel('services-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'services', filter: `user_id=eq.${userId}` },
                () => fetchServices()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    async function fetchServices() {
        if (!userId) return;

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching services:', error);
        } else {
            // Map DB columns back to frontend types
            const mappedServices: Service[] = (data || []).map(item => ({
                id: item.id,
                client: item.client || '',
                description: item.description || '',
                value: item.value,
                startDate: item.date, // Map 'date' back to 'startDate'
                endDate: item.end_date, // Map 'end_date' back to 'endDate'
                status: item.status || 'Pendente'
            }));
            setServices(mappedServices);
        }
        setLoading(false);
    }

    async function addService(service: Omit<Service, 'id'>) {
        if (!userId) return;

        // Map frontend types to DB columns
        const dbService = {
            user_id: userId,
            client: service.client,
            description: service.description,
            value: service.value,
            date: service.startDate, // Map 'startDate' to 'date'
            end_date: service.endDate, // Map 'endDate' to 'end_date'
            status: service.status
        };

        const { error } = await supabase
            .from('services')
            .insert(dbService);

        if (error) {
            console.error('Error adding service:', error);
            alert('Erro ao adicionar serviço. Tente novamente.');
        } else {
            fetchServices();
        }
    }

    async function updateService(id: string, updates: Partial<Service>) {
        if (!userId) return;

        // Map updates to DB columns
        const dbUpdates: any = {};
        if (updates.client !== undefined) dbUpdates.client = updates.client;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.value !== undefined) dbUpdates.value = updates.value;
        if (updates.startDate !== undefined) dbUpdates.date = updates.startDate;
        if (updates.endDate !== undefined) dbUpdates.end_date = updates.endDate;
        if (updates.status !== undefined) dbUpdates.status = updates.status;

        const { error } = await supabase
            .from('services')
            .update(dbUpdates)
            .eq('id', id)
            .eq('user_id', userId);

        if (error) {
            console.error('Error updating service:', error);
            alert('Erro ao atualizar serviço. Tente novamente.');
        } else {
            fetchServices();
        }
    }

    async function deleteService(id: string) {
        if (!userId) return;

        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) {
            console.error('Error deleting service:', error);
            alert('Erro ao excluir serviço. Tente novamente.');
        } else {
            fetchServices();
        }
    }

    return { services, loading, addService, updateService, deleteService };
}

export function useWithdrawals(userId: string | undefined) {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setWithdrawals([]);
            setLoading(false);
            return;
        }

        fetchWithdrawals();

        const channel = supabase
            .channel('withdrawals-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'withdrawals', filter: `user_id=eq.${userId}` },
                () => fetchWithdrawals()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    async function fetchWithdrawals() {
        if (!userId) return;

        const { data, error } = await supabase
            .from('withdrawals')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching withdrawals:', error);
        } else {
            // Map DB columns to frontend types
            const mappedWithdrawals: Withdrawal[] = (data || []).map(item => ({
                id: item.id,
                date: item.date,
                description: item.description || '',
                category: item.category || 'Outros',
                value: item.value
            }));
            setWithdrawals(mappedWithdrawals);
        }
        setLoading(false);
    }

    async function addWithdrawal(withdrawal: Omit<Withdrawal, 'id'>) {
        if (!userId) return;

        const dbWithdrawal = {
            user_id: userId,
            date: withdrawal.date,
            description: withdrawal.description,
            category: withdrawal.category,
            value: withdrawal.value
        };

        const { error } = await supabase
            .from('withdrawals')
            .insert(dbWithdrawal);

        if (error) {
            console.error('Error adding withdrawal:', error);
            alert('Erro ao adicionar retirada. Tente novamente.');
        } else {
            fetchWithdrawals();
        }
    }

    async function deleteWithdrawal(id: string) {
        if (!userId) return;

        const { error } = await supabase
            .from('withdrawals')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

        if (error) {
            console.error('Error deleting withdrawal:', error);
            alert('Erro ao excluir retirada. Tente novamente.');
        } else {
            fetchWithdrawals();
        }
    }

    return { withdrawals, loading, addWithdrawal, deleteWithdrawal };
}
