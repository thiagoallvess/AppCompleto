import { ArrowLeft, Home, IceCream, Receipt, Settings, Store, Bolt, HardHat, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useStore } from "../contexts/StoreContext";
import { showSuccess } from "../utils/toast";