const deleteStockMovement = async (id: string) => {
    const movement = stockMovements.find(m => m.id === id);
    if (movement) {
      // Revert the stock changes
      if (movement.item_type === "ingredient") {
        setIngredients(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            
            // Calculate the cost to subtract based on movement cost type
            let totalCostToSubtract = 0;
            
            if (movement.cost_type === "unitario") {
              totalCostToSubtract = movement.quantity * movement.cost_value;
            } else if (movement.cost_type === "pacote") {
              totalCostToSubtract = movement.cost_value;
            }
            
            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }

            return {
              ...item,
              quantity: newQuantity,
              unitCost: newUnitCost,
              status: newStatus
            };
          }
          return item;
        }));
      } else {
        setPackagingItems(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            
            // Calculate the cost to subtract based on movement cost type
            let totalCostToSubtract = 0;
            
            if (movement.cost_type === "unitario") {
              totalCostToSubtract = movement.quantity * movement.cost_value;
            } else if (movement.cost_type === "pacote") {
              totalCostToSubtract = movement.cost_value;
            }
            
            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }

            return {
              ...item,
              quantity: newQuantity,
              unitCost: newUnitCost,
              status: newStatus
            };
          }
          return item;
        }));
      }

      setStockMovements(prev => prev.filter(m => m.id !== id));
    }
  };