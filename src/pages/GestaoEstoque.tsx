const handleAddMovement = (formData) => {
  try {
    const movement = {
      id: Date.now().toString(),
      item_id: formData.itemId,
      item_type: formData.itemType,
      quantity: formData.quantity,
      cost_type: formData.cost_type,
      cost_value: formData.cost_value,
      description: formData.description,
      date: formData.date.toISOString()
    };

    addStockMovement(movement);
    setIsMovementModalOpen(false);
    showSuccess("Movimentação de estoque registrada!");
  } catch (error) {
    console.error('Error adding stock movement:', error);
    showError("Erro ao registrar movimentação");
  }
};

const handleUpdateMovement = (formData) => {
  try {
    const updatedMovement = {
      id: movementToEdit.id,
      item_id: formData.itemId,
      item_type: formData.itemType,
      quantity: formData.quantity,
      cost_type: formData.cost_type,
      cost_value: formData.cost_value,
      description: formData.description,
      date: formData.date.toISOString()
    };

    updateStockMovement(movementToEdit.id, updatedMovement);
    setMovementToEdit(null);
    setIsMovementModalOpen(false);
    showSuccess("Movimentação atualizada!");
  } catch (error) {
    console.error('Error updating stock movement:', error);
    showError("Erro ao atualizar movimentação");
  }
};

const handleDeleteMovement = (movementId) => {
  try {
    if (confirm("Tem certeza que deseja excluir esta movimentação?")) {
      deleteStockMovement(movementId);
      showSuccess("Movimentação excluída!");
    }
  } catch (error) {
    console.error('Error deleting stock movement:', error);
    showError("Erro ao excluir movimentação");
  }
};