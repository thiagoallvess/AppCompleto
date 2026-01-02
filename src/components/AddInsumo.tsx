import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { useStock } from "@/contexts/StockContext";

const AddInsumo = () => {
  const navigate = useNavigate();
  const { addIngredient, addPackagingItem } = useStock();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "un",
    minQuantity: "",
  });

  const setField = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const qty = Number(form.quantity);
    if (!form.name || !form.category)
      return showError("Preencha nome e categoria.");
    if (qty <= 0) return showError("Quantidade inválida.");

    setLoading(true);
    try {
      const item = {
        name: form.name,
        category: form.category,
        quantity: qty,
        unit: form.unit,
        unitCost: 0,
        minQuantity: form.minQuantity ? Number(form.minQuantity) : undefined,
        icon: form.category === "Ingredientes" ? "Cookie" : "Package",
        status: "Em dia",
      };

      await (form.category === "Ingredientes"
        ? addIngredient(item)
        : addPackagingItem(item));

      showSuccess(`"${form.name}" adicionado ao estoque!`);
      navigate("/gestao-estoque");
    } catch (err: any) {
      console.error(err);
      showError(err.message || "Erro ao salvar insumo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // JSX permanece igual
  );
};

export default AddInsumo;
