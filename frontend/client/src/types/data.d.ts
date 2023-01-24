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