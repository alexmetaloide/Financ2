import React from 'react';
import { Service, Withdrawal } from '../types';
import { formatCurrency } from '../utils';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  services: Service[];
  withdrawals: Withdrawal[];
}

export const Dashboard: React.FC<DashboardProps> = ({ services, withdrawals }) => {
  const totalServices = services.reduce((acc, curr) => acc + curr.value, 0);
  const totalWithdrawals = withdrawals.reduce((acc, curr) => acc + curr.value, 0);
  const balance = totalServices - totalWithdrawals;

  const data = [
    { name: 'Entradas', value: totalServices, color: '#4f46e5' },
    { name: 'Saídas', value: totalWithdrawals, color: '#e11d48' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Entradas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Entradas</h3>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalServices)}</p>
          <p className="text-xs text-gray-500 mt-1">Receita total acumulada</p>
        </div>

        {/* Card Saídas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Saídas</h3>
            <div className="p-2 bg-rose-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-rose-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalWithdrawals)}</p>
          <p className="text-xs text-gray-500 mt-1">Despesas totais acumuladas</p>
        </div>

        {/* Card Saldo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Saldo Atual</h3>
            <div className={`p-2 rounded-lg ${balance >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <Wallet className={`w-5 h-5 ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Balanço geral</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Visão Geral Financeira</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280' }} 
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Valor']}
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
