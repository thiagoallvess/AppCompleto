import { useState } from "react";
import { useDrivers } from "@/contexts/DriversContext";
import { useOrders } from "@/contexts/OrdersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";
import AtribuirPedidoModal from "@/components/AtribuirPedidoModal";
import DesatribuirPedidoModal from "@/components/DesatribuirPedidoModal";
import HistoricoEntregasModal from "@/components/HistoricoEntregasModal";