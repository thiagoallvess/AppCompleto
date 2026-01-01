"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client'; // import supabase client
import NotificationsIcon from "@lucide-react/icons/notifications"; // import notifications icon

const NewOrderOverlay = () => {

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

    if(error) {
      console.error("Error fetching orders:", error);
    } else if(orders.length > 0) {
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
        inset-0
        z-50
        bg-black bg-opacity-50
        "
      >
        <div
          className="
          bg-white
          text-black
          p-4
          rounded
          text-center
          m-4
          "
        >
          <NotificationsIcon size={48} />
          <h2 className="text-xl mb-2">{message}</h2>
          <button onClick={handleDismiss}>
            Fechar
          </button>
        </div>
      </div>
      )}
    </>
  );
};

export default NewOrderOverlay;

<dyad-write path="src/pages/MinhaTela.tsx" description="Updating MinhaTela component to use NewOrderOverlay and manage its state.">
"use client";

import React, { useRef } from 'react';
// ... other imports

const MinhaTela = () => {
  // ... other states

  const [newOrder, setNewOrder] = useState(false); // new state to handle order creation

  const createOrder = async () => {
    // ... existing createOrder logic

    if(!error) {
      setNewOrder(true); // set new order to true when order is created
    }
  };

  return (
    <>
    {/* ... other components */}
    <NewOrderOverlay /> // include NewOrderOverlay component
    </>
  );
};

export default MinhaTela;