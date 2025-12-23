import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Client {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  status: string | null;
  statusColor: string;
  lastOrder?: string;
  registered?: string;
  totalSpent?: number;
  debt?: number;
  preference?: string;
  isOnline?: boolean;
  type: 'vip' | 'debtor' | 'new' | 'standard' | 'inactive';
}

interface ClientsContextType {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  removeClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
};

interface ClientsProviderProps {
  children: ReactNode;
}

export const ClientsProvider: React.FC<ClientsProviderProps> = ({ children }) => {
  // Inicializa o estado diretamente do localStorage para evitar flashes de conteúdo ou reinicialização incorreta
  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const storedClients = localStorage.getItem('clients');
      if (storedClients) {
        return JSON.parse(storedClients);
      }
    } catch (error) {
      console.error('Error parsing clients from localStorage:', error);
    }
    
    // Dados padrão apenas se NUNCA houve dados salvos
    return [
      {
        id: "1",
        name: "Maria Silva",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuATnOgwjdatv2PuCBwYZ9_8wozN9Vb8eVEMG9uQMv3p_AyJjWvZ9MJw2-d04bcBFq4Y_4188BM6tgO0H5wM3uqdyLguoJw5_sStCNK1q6t3ufbIQxiR-cYLqZtGmfsUTomFqe2XfiSspGzCVa3_APTZ9rVah6UXJXhcF-Zhnmyh4TKXCPKaNvMUc4fPrE3gceUwe46m-D_GY3AXbc7vEs1Evt_Q_271UyaypBKvfRdnICSdNb3iTzcadPG9-3ZnvxgJuIIEmLQmew",
        status: "VIP",
        statusColor: "yellow",
        lastOrder: "Hoje, 14:30",
        totalSpent: 450.00,
        isOnline: true,
        type: "vip"
      },
      {
        id: "2",
        name: "João Souza",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO87rE_qgFksEKiShqMAZbbtrOWc3LOlkRp420n15KoVRr7SpctX9clA8IPagAq2rRDKsosshOEDqPZnsGuesHKwjc6-mdqB31_DcGL5jDNkcPQ403xwYQDjLr6F3lBS5eZoDLH95dZUzMkyPrJc8nOVGKkHK3m-wRqj2GeENu79sqzqofFsKKHmTiIE7dXm2rT4rKHZrCVUMm2qSJfR0KjrnvrO_6msa2L7C-WQ95C0LYhQ043xCRmpKYEvyuspov50AjnSGatw",
        status: "Pendente",
        statusColor: "red",
        lastOrder: "Ontem, 09:15",
        debt: 25.00,
        type: "debtor"
      },
      {
        id: "3",
        name: "Bruno Ferreira",
        initials: "BF",
        status: "Novo",
        statusColor: "blue",
        registered: "15/10/2023",
        preference: "Ninho c/ Nutella",
        type: "new"
      },
      {
        id: "4",
        name: "Carla Dias",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfzIKUXhxlSfDjxkFpISPVb6bsmspsBeD8OV4scHNq8pWTxXnZ6kjE_14EaoddytcaMtDq3g01fBMbuZFNz7LEAgwJ0VgbDIwSqrmF2nAodzjcL59djAIKgtNl_RcLT93rclnnDIrU7bDoEC4cxRyZUXtkoFUn8Fr5NZOpWQfZ8tTnh3RRHIWB2DBev-_CjBXk40wPTD8e0G5JPtDiRMf-eJJWr3lK-XxTfl5Q8BHQzKEyyMq_Aiht-DphW3dfntXgakQSoPaZ-Q",
        status: null,
        lastOrder: "12/10, 18:00",
        totalSpent: 120.00,
        type: "standard"
      }
    ];
  });

  // Sincroniza com localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client =>
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const removeClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  return (
    <ClientsContext.Provider value={{
      clients,
      addClient,
      updateClient,
      removeClient,
      getClientById
    }}>
      {children}
    </ClientsContext.Provider>
  );
};