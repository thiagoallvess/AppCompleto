import { ArrowLeft, Filter, TrendingUp, TrendingDown, Star, Clock, Truck, Search, Calendar, ChevronRight, BarChart3, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStock } from "@/contexts/StockContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useOrders } from "@/contexts/OrdersContext";
import { useExpenses } from "@/contexts/ExpensesProvider";
import { useDrivers } from "@/contexts/DriversContext";