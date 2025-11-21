import React, { useState, useEffect } from 'react';
import { Service, Withdrawal, TabType } from './types';
import { Dashboard } from './components/Dashboard';
import { ServiceList } from './components/ServiceList';
import { WithdrawalList } from './components/WithdrawalList';
import { LayoutDashboard, ArrowRightLeft } from 'lucide-react';

const App: React.FC = () => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [services, setServices] = useState<Service[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Persistence (LocalStorage) ---
  
  // Load data on mount
  useEffect(() => {
    const storedServices = localStorage.getItem('fincontrol_services');
    const storedWithdrawals = localStorage.getItem('fincontrol_withdrawals');

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedWithdrawals) setWithdrawals(JSON.parse(storedWithdrawals));
    
    setIsLoaded(true);
  }, []);

  // Save data on change (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fincontrol_services', JSON.stringify(services));
    }
  }, [services, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fincontrol_withdrawals', JSON.stringify(withdrawals));
    }
  }, [withdrawals, isLoaded]);

  // --- Handlers ---

  const handleAddService = (newService: Service) => {
    setServices([...services, newService]);
  };

  const handleEditService = (updatedService: Service) => {
    setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleAddWithdrawal = (newWithdrawal: Withdrawal) => {
    setWithdrawals([...withdrawals, newWithdrawal]);
  };

  const handleDeleteWithdrawal = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta retirada?')) {
      setWithdrawals(withdrawals.filter(w => w.id !== id));
    }
  };

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Carregando...</div>;

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
              <span className="text-xl font-bold text-gray-800 tracking-tight">FinControl<span className="text-primary">Pro</span></span>
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
              onAdd={handleAddService}
              onEdit={handleEditService}
              onDelete={handleDeleteService}
            />
          ) : (
            <WithdrawalList
              withdrawals={withdrawals}
              onAdd={handleAddWithdrawal}
              onDelete={handleDeleteWithdrawal}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;