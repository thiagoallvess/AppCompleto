import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface OrderItem {
  quantity: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  status: string;
  statusColor: string;
  statusIcon: string;
  time: string;
  total: number;
  items: OrderItem[];
  isNew?: boolean;
  section: 'open' | 'finished';
  date?: string;
  cancelled?: boolean;
  eta?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  removeOrder: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders && JSON.parse(storedOrders).length > 0) {
          setOrders(JSON.parse(storedOrders));
        } else {
          // Dados de exemplo para teste inicial
          const mockOrders: Order[] = [
            {
              id: "#4829",
              customer: "Maria Silva",
              status: "Novo",
              statusColor: "primary",
              statusIcon: "inventory_2",
              time: "14:30",
              total: 45.00,
              isNew: true,
              section: 'open',
              date: "25/10/2023",
              items: [
                { quantity: 2, name: "Ninho com Nutella", description: "Gourmet • Cremoso", price: 15.00 },
                { quantity: 1, name: "Morango Cremoso", description: "Fruta • Refrescante", price: 15.00 }
              ]
            },
            {
              id: "#4825",
              customer: "João Souza",
              status: "Rota",
              statusColor: "blue",
              statusIcon: "sports_motorsports",
              time: "13:15",
              total: 30.00,
              section: 'open',
              date: "25/10/2023",
              eta: "15 min",
              items: [
                { quantity: 2, name: "Maracujá Trufado", description: "Gourmet • Intenso", price: 15.00 }
              ]
            }
          ];
          setOrders(mockOrders);
          localStorage.setItem('orders', JSON.stringify(mockOrders));
        }
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, ...updates } : order
    ));
  };

  const removeOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getOrderById = (id: string) => {
    // Tenta buscar com ou sem o caractere '#'
    return orders.find(order => order.id === id || order.id === `#${id}`);
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      updateOrder,
      removeOrder,
      getOrderById
    }}>
      {children}
    </OrdersContext.Provider>
  );
};