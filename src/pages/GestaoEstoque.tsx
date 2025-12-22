const handleSaveMovement = () => {
    // Validate required fields
    if (!movementForm.item || !movementForm.quantity || !movementForm.unitValue) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const quantityToAdd = parseFloat(movementForm.quantity);
    if (quantityToAdd <= 0) {
      showError("A quantidade deve ser maior que zero.");
      return;
    }

    // Find and update the inventory item
    const updatedItems = inventoryItems.map(item => {
      if (item.id === movementForm.item) {
        const newQuantity = parseFloat(item.quantity) + quantityToAdd;
        let newStatus = "Em dia";
        
        // Update status based on minimum quantity
        if (item.minQuantity && newQuantity <= parseFloat(item.minQuantity)) {
          newStatus = "Baixo";
        }
        
        return {
          ...item,
          quantity: newQuantity.toString(),
          status: newStatus
        };
      }
      return item;
    });

    // Update state and localStorage
    setInventoryItems(updatedItems);

    showSuccess(`Estoque atualizado com sucesso! Adicionados ${quantityToAdd} unidades.`);

    // Reset form and close modal
    setMovementForm({
      itemType: "Ingredientes",
      item: "",
      quantity: "",
      costType: "unitario",
      unitValue: "",
      date: new Date().toISOString().split('T')[0],
      description: ""
    });
    setIsMovementModalOpen(false);
  };