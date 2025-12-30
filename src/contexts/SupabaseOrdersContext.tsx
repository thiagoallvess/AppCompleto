import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem, HistoryEvent } from './OrdersContext';

interface SupabaseOrdersContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Order) => Promise<void>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;
  removeOrder: (id: string) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
}

const SupabaseOrdersContext = createContext<SupabaseOrdersContextType | undefined>(undefined);

export const useSupabaseOrders = () => {
  const context = useContext(SupabaseOrdersContext);
  if (!context) {
    throw new Error('useSupabaseOrders must be used within a SupabaseOrdersProvider');
  }
  return context;
};

interface SupabaseOrdersProviderProps {
  children: ReactNode;
}

export const SupabaseOrdersProvider: React.FC<SupabaseOrdersProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedOrders = data.map(item => ({
        id: item.id,
        customer: item.customer,
        status: item.status,
        statusColor: item.status_color,
        statusIcon: item.status_icon,
        time: item.time,
        total: item.total,
        items: item.items as OrderItem[],
        isNew: item.is_new,
        section: item.section,
        date: item.date,
        cancelled: item.cancelled,
        eta: item.eta,
        history: item.history as HistoryEvent[],
        driverId: item.driver_id,
        driverName: item.driver_name,
        discount: item.discount,
        couponCode: item.coupon_code
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (order: Order) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          id: order.id,
          customer: order.customer,
          status: order.status,
          status_color: order.statusColor,
          status_icon: order.statusIcon,
          time: order.time,
          total: order.total,
          items: order.items,
          is_new: order.isNew,
          section: order.section,
          date: order.date,
          cancelled: order.cancelled,
          eta: order.eta,
          history: order.history,
          driver_id: order.driverId,
          driver_name: order.driverName,
          discount: order.discount,
          coupon_code: order.couponCode
        }])
        .select()
        .single();

      if (error) throw error;

      const newOrder = {
        id: data.id,
        customer: data.customer,
        status: data.status,
        statusColor: data.status_color,
        statusIcon: data.status_icon,
        time: data.time,
        total: data.total,
        items: data.items as OrderItem[],
        isNew: data.is_new,
        section: data.section,
        date: data.date,
        cancelled: data.cancelled,
        eta: data.eta,
        history: data.history as HistoryEvent[],
        driverId: data.driver_id,
        driverName: data.driver_name,
        discount: data.discount,
        couponCode: data.coupon_code
      };

      setOrders(prev => [newOrder, ...prev]);
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      const updateData: any = {};
      if (updates.customer !== undefined) updateData.customer = updates.customer;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.statusColor !== undefined) updateData.status_color = updates.statusColor;
      if (updates.statusIcon !== undefined) updateData.status_icon = updates.statusIcon;
      if (updates.time !== undefined) updateData.time = updates.time;
      if (updates.total !== undefined) updateData.total = updates.total;
      if (updates.items !== undefined) updateData.items = updates.items;
      if (updates.isNew !== undefined) updateData.is_new = updates.isNew;
      if (updates.section !== undefined) updateData.section = updates.section;
      if (updates.date !== undefined) updateData.date = updates.date;
      if (updates.cancelled !== undefined) updateData.cancelled = updates.cancelled;
      if (updates.eta !== undefined) updateData.eta = updates.eta;
      if (updates.history !== undefined) updateData.history = updates.history;
      if (updates.driverId !== undefined) updateData.driver_id = updates.driverId;
      if (updates.driverName !== undefined) updateData.driver_name = updates.driverName;
      if (updates.discount !== undefined) updateData.discount = updates.discount;
      if (updates.couponCode !== undefined) updateData.coupon_code = updates.couponCode;

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setOrders(prev => prev.map(order => {
        if (order.id === id) {
          const newHistory = [...(order.history || [])];
          if (updates.status && updates.status !== order.status) {
            newHistory.push({
              status: updates.status,
              time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              date: new Date().toLocaleDateString('pt-BR')
            });
          }
          return { ...order, ...updates, history: newHistory };
        }
        return order;
      }));
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  const removeOrder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error removing order:', error);
      throw error;
    }
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id || order.id === `#${id}`);
  };

  return (
    <SupabaseOrdersContext.Provider value={{
      orders,
      loading,
      addOrder,
      updateOrder,
      removeOrder,
      getOrderById
    }}>
      {children}
    </SupabaseOrdersContext.Provider>
  );
};