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
            setServices(data || []);
        }
        setLoading(false);
    }

    async function addService(service: Omit<Service, 'id'>) {
        if (!userId) return;

        const { error } = await supabase
            .from('services')
            .insert({ ...service, user_id: userId });

        if (error) {
            console.error('Error adding service:', error);
            alert('Erro ao adicionar serviço. Tente novamente.');
        }
    }

    async function updateService(id: string, updates: Partial<Service>) {
        if (!userId) return;

        const { error } = await supabase
            .from('services')
            .update(updates)
            .eq('id', id)
            .eq('user_id', userId);

        if (error) {
            console.error('Error updating service:', error);
            alert('Erro ao atualizar serviço. Tente novamente.');
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
            setWithdrawals(data || []);
        }
        setLoading(false);
    }

    async function addWithdrawal(withdrawal: Omit<Withdrawal, 'id'>) {
        if (!userId) return;

        const { error } = await supabase
            .from('withdrawals')
            .insert({ ...withdrawal, user_id: userId });

        if (error) {
            console.error('Error adding withdrawal:', error);
            alert('Erro ao adicionar retirada. Tente novamente.');
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
        }
    }

    return { withdrawals, loading, addWithdrawal, deleteWithdrawal };
}
