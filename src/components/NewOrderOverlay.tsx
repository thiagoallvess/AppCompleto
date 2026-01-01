"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import NotificationsIcon from "@lucide-react/icons/notifications";

// Import required modules for supabase
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const NewOrderOverlay: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkNewOrder();
  }, []);

  const checkNewOrder = async () => {
    // logic to check if a new order has been created
    const { data: orders, error } = await supabase
      .from('orders')
      .select('name')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching orders:", error);
    } else if (orders.length > 0) {
      setMessage(`Nova entrega para o pedido ${orders[0].name}!`);
      setOpen(true);
    }
  };

  const handleDismiss = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="
            justify-center
            items-center
            fixed
            bottom-4
            left-1/2
            transform
            -translate-x-1/2
            z-50
            bg-white
            bg-opacity-50
            p-4
            rounded
            text-center
            m-4
            shadow-md
            max-w-md
            "
        >
          <NotificationsIcon size={48} />
          <h2 className="text-xl font-bold mb-2">{message}</h2>
          <button onClick={handleDismiss} className="text-primary mt-2">
            Fechar
          </button>
        </div>
      )}
    </>
  );
};

export default NewOrderOverlay;