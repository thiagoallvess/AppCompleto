const addStockMovement = (movement: StockMovement) => {
  // Update stock levels based on movement
  if (movement.item_type === "ingredient") {
    setIngredients(prev => prev.map(item => {
      if (item.id === movement.item_id) {
        const currentQuantity = item.quantity;
        const currentTotalCost = currentQuantity * item.unitCost;

        // Calculate new cost based on movement type
        let newTotalCost = currentTotalCost;
        let newQuantity = currentQuantity + movement.quantity;

        if (movement.cost_type === "unitario") {
          // cost_value is per unit
          newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
        } else if (movement.cost_type === "pacote") {
          // cost_value is total package cost
          newTotalCost = currentTotalCost + movement.cost_value;
        }

        const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

        // Determine status
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

        // Calculate new cost based on movement type
        let newTotalCost = currentTotalCost;
        let newQuantity = currentQuantity + movement.quantity;

        if (movement.cost_type === "unitario") {
          // cost_value is per unit
          newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
        } else if (movement.cost_type === "pacote") {
          // cost_value is total package cost
          newTotalCost = currentTotalCost + movement.cost_value;
        }

        const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

        // Determine status
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

  setStockMovements(prev => [...prev, movement]);
};

const updateStockMovement = (id: string, updates: Partial<StockMovement>) => {
  const oldMovement = stockMovements.find(m => m.id === id);
  if (oldMovement) {
    // First, revert the old movement
    if (oldMovement.item_type === "ingredient") {
      setIngredients(prev => prev.map(item => {
        if (item.id === oldMovement.item_id) {
          const currentQuantity = item.quantity;
          const currentTotalCost = currentQuantity * item.unitCost;

          // Calculate the cost to subtract based on old movement cost type
          let totalCostToSubtract = 0;

          if (oldMovement.cost_type === "unitario") {
            totalCostToSubtract = oldMovement.quantity * oldMovement.cost_value;
          } else if (oldMovement.cost_type === "pacote") {
            totalCostToSubtract = oldMovement.cost_value;
          }

          const newTotalCost = currentTotalCost - totalCostToSubtract;
          const newQuantity = currentQuantity - oldMovement.quantity;
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
        if (item.id === oldMovement.item_id) {
          const currentQuantity = item.quantity;
          const currentTotalCost = currentQuantity * item.unitCost;

          // Calculate the cost to subtract based on old movement cost type
          let totalCostToSubtract = 0;

          if (oldMovement.cost_type === "unitario") {
            totalCostToSubtract = oldMovement.quantity * oldMovement.cost_value;
          } else if (oldMovement.cost_type === "pacote") {
            totalCostToSubtract = oldMovement.cost_value;
          }

          const newTotalCost = currentTotalCost - totalCostToSubtract;
          const newQuantity = currentQuantity - oldMovement.quantity;
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

    // Update the movement
    setStockMovements(prev => prev.map(m =>
      m.id === id ? { ...m, ...updates } : m
    ));

    // Apply the updated movement
    const updatedMovement = { ...oldMovement, ...updates };
    addStockMovement(updatedMovement);
  }
};

const deleteStockMovement = (id: string) => {
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