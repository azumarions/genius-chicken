export interface AUTH {
  email: string
  password: string
  isLogin: boolean
}

export interface PROFILE {
  id: number
  userProfile: number
  name: string
  description: string
  created_at: string
}

export interface USER {
  id: number
  userProfile: number
  name: string
  description: string
  created_at: string
}

export interface TASK {
  id: number
  userTask: number
  title: string
  description: string
  status: string
  status_name: string
  access: string
  access_name: string
  category: number
  category_item: string
  estimate: number
  created_at: string
  updated_at: string
}

export interface SUBTASK {
  id: number
  userSubTask: number
  subTaskInTask: number
  title: string
  description: string
  status: string
  status_name: string
  access: string
  access_name: string
  estimate: number
  category: number
  category_item: string
  subTaskOwner: string
  subTaskResponsible: string
  created_at: string
  updated_at: string
}

export interface EDIT_TASK {
  id: number
  userTask: number
  title: string
  description: string
  status: string
  access: string
  estimate: number
  category: number
  category_item: stirng
}

export interface CATEGORY {
  id: number
  item: string
}

export interface SnackbarMessage {
  message?: string
  key: number
}

export interface State {
  open: boolean
  snackPack: readonly SnackbarMessage[]
  messageInfo?: SnackbarMessage
}

export interface SORT_STATE {
  rows: TASK[]
  order: 'desc' | 'asc'
  activeKey: string
}

export interface NEW_CATEGORY {
  newCategory: CATEGORY[]
}

export interface GROUP {
  id: number
  userGroup: number
  taskGroup: number
  created_at: string
}

export interface CLUSTER {
  id: number
  userCluster: number
  taskCluster: number
  task_title: string
  task_description: string
  task_status: string
  task_access: string
  task_category: number
  task_estimate: number
  task_created_at: string
  task_updated_at: string
  user_name: string
  user_description: string
  created_at: string
}
