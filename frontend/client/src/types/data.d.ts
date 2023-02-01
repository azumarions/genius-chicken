import { KeyedMutator } from "swr"

export interface MUTATE {
    mutate: KeyedMutator<any>
}

export interface AUTH {
    email: string
    password: string
    isLogin: boolean
}

export interface PROFILE {
    id: number
    userProfile: number
    name: string
    statusMessage: string
    description: string
    img: string
    editImage: File | null
}
  
export interface USER {
    id: number
    userProfile: number
    name: string
    description: string
    img: string
}
  
export interface TASK {
    id: number
    userTask: number
    title: string
    description: string
    status: string
    status_name: string
    category: number
    category_item: string
    created_at: string
    updated_at: string
}

export interface EDIT_TASK {
    id: number
    userTask: number
    title: string
    description: string
    status: string;
    category: number
    category_item: stirng
}

export interface CATEGORY {
    id: number;
    item: string;
}

export interface SnackbarMessage {
    message?: string;
    key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

export interface SORT_STATE {
    rows: TASK[];
    order: "desc" | "asc";
    activeKey: string;
}

export interface NEW_CATEGORY {
    newCategory: CATEGORY[]
}