import { NavItem } from "./type";
import { SetStateAction, Dispatch } from "react";

export interface ActionDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemName?: string;
}

export interface EditDialogProps {
  data: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export interface ItemModel {
  id: string;
  code: string;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
}

export interface ClientModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface OrderModel {
  id: number;
  clientId: number;
  itemId: number;
  name: string;
  email: string;
  methodPayment: string;
  itemsCount: number;
  totalPrice: string;
  status: string;
  dueDate: string;
  dateOrder: string;
}

export interface UsersModel {
  id: number;
  name: string;
  email: string;
  role: string;
  statusSystem: boolean;
  createdAt: string;
}

export interface HeaderUserProps {
  navItems: NavItem[]
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  user?: {
    name: string;
    image?: string;
  };
}

export interface TableListProps {
  datas: any[];
  loading: boolean;
  onRefresh: () => void;
}

// Auth Context Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  statusSystem: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface GraphQLError {
  message: string;
  extensions?: {
    code: string;
    [key: string]: unknown;
  };
}

export interface GraphQLResponse<T = unknown> {
  data: T | null;
  errors?: GraphQLError[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  authenticatedRequest: <T = unknown>(
    query: string,
    variables?: Record<string, unknown>
  ) => Promise<GraphQLResponse<T>>;
}