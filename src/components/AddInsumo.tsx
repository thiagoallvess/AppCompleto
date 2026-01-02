import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { useStock } from "@/contexts/StockContext";

const AddInsumo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minQuantity: ""
  });

  const { addIngredient, addPackagingItem } = useStock();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[AddInsumo] handleSubmit triggered"); // Add this line
    if (!formData.name || !formData.category) {
      showError("Por favor, preencha o nome e a categoria do insumo.");
      return;
    }

    const parsedQuantity = parseFloat(formData.quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      showError("Por favor, insira uma quantidade válida (maior que zero).");
      return;
    }

    setIsSubmitting(true);
    try {
      const newItem = {
        name: formData.name,
        unit: formData.unit || "un",
        quantity: parsedQuantity,
        unitCost: 0,
        minQuantity: formData.minQuantity ? parseFloat(formData.minQuantity) : undefined,
        category: formData.category,
        icon: formData.category === "Ingredientes" ? "Cookie" : "Package",
        status: "Em dia"
      };

      if (formData.category === "Ingredientes") {
        await addIngredient(newItem);
      } else {
        await addPackagingItem(newItem);
      }

      showSuccess(`"${formData.name}" foi adicionado ao estoque!`);
      navigate("/gestao-estoque");
    } catch (error: any) {
      console.error("[AddInsumo] Erro ao salvar insumo:", error);
      showError(error.message || "Erro ao salvar insumo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ... (rest of the component)
  );
};

export default AddInsumo;