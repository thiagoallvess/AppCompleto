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
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          // Initialize with default orders if none exist
          const defaultOrders: Order[] = [
            {
              id: "#1024",
              customer: "Maria Silva",
              status: "Novo",
              statusColor: "primary",
              statusIcon: "inventory_2",
              time: "14:32",
              total: 45.00,
              items: [
                { quantity: 3, name: "Ninho com Nutella", description: "Cremoso • Sem adição de água", price: 8.00 },
                { quantity: 2, name: "Morango Gourmet", description: "Fruta natural • Base leite", price: 8.00 },
                { quantity: 1, name: "Coco com Doce de Leite", description: "Tradicional • Base leite", price: 6.00 }
              ],
              isNew: true,
              section: "open"
            },
            {
              id: "#1023",
              customer: "Carlos Oliveira",
              status: "Preparo",
              statusColor: "orange",
              statusIcon: "soup_kitchen",
              time: "14:15",
              total: 22.50,
              items: [
                { quantity: 5, name: "Limão Siciliano", description: "Refrescante • Base leite", price: 4.50 }
              ],
              section: "open"
            },
            {
              id: "#1022",
              customer: "Ana Souza",
              status: "Rota",
              statusColor: "blue",
              statusIcon: "sports_motorsports",
              time: "13:50",
              total: 60.00,
              items: [
                { quantity: 4, name: "Chocolate Belga", description: "Intenso • Cacau 70%", price: 7.50 }
              ],
              eta: "Chegada em 5 min",
              section: "open"
            },
            {
              id: "#1021",
              customer: "Roberto Lima",
              status: "Entregue",
              statusColor: "green",
              statusIcon: "check_circle",
              time: "13:30",
              total: 18.00,
              items: [
                { quantity: 2, name: "Paçoca Cremosa", description: "Doce brasileiro • Edição especial", price: 9.00 }
              ],
              section: "finished"
            },
            {
              id: "#1020",
              customer: "Julia M.",
              status: "Cancelado",
              statusColor: "red",
              statusIcon: "cancel",
              time: "",
              total: 32.00,
              items: [
                { quantity: 4, name: "Morango com Leite Condensado", description: "Clássico • Base leite", price: 8.00 }
              ],
              section: "finished",
              cancelled: true
            }
          ];
          setOrders(defaultOrders);
          localStorage.setItem('orders', JSON.stringify(defaultOrders));
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
    setOrders(prev => [...prev, order]);
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
    return orders.find(order => order.id === id);
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