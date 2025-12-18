import React, { useState } from 'react';
import { TabType } from './types';
import { Dashboard } from './components/Dashboard';
import { ServiceList } from './components/ServiceList';
import { WithdrawalList } from './components/WithdrawalList';
import { LoginScreen } from './components/LoginScreen';
import { LayoutDashboard, ArrowRightLeft, LogOut } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useServices, useWithdrawals } from './hooks/useSupabase';

const App: React.FC = () => {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const { services, loading: servicesLoading, addService, updateService, deleteService } = useServices(user?.id);
  const { withdrawals, loading: withdrawalsLoading, addWithdrawal, deleteWithdrawal } = useWithdrawals(user?.id);

  const [activeTab, setActiveTab] = useState<TabType>('services');

  // Loading state
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login screen
  if (!user) {
    return <LoginScreen onLogin={signInWithGoogle} />;
  }

  // Loading data
  if (servicesLoading || withdrawalsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  // Main app
  return (
    <div className="min-h-screen font-sans pb-12">
      {/* Header / Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                FinControl<span className="text-primary">Pro</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-600 max-w-[150px] truncate">
                  {user.email}
                </span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Dashboard Section */}
        <Dashboard services={services} withdrawals={withdrawals} />

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('services')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                ${activeTab === 'services'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <LayoutDashboard className={`mr-2 -ml-0.5 h-5 w-5 ${activeTab === 'services' ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'}`} />
              Serviços (Entradas)
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block hidden">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                ${activeTab === 'withdrawals'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <ArrowRightLeft className={`mr-2 -ml-0.5 h-5 w-5 ${activeTab === 'withdrawals' ? 'text-rose-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
              Retiradas (Saídas)
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block hidden">
                {withdrawals.length}
              </span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {activeTab === 'services' ? (
            <ServiceList
              services={services}
              onAdd={addService}
              onEdit={updateService}
              onDelete={deleteService}
            />
          ) : (
            <WithdrawalList
              withdrawals={withdrawals}
              onAdd={addWithdrawal}
              onDelete={deleteWithdrawal}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;