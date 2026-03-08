export const GET_USER_INFO = `
  query GetUserInfo {
    getUserInfo {
      id
      name
      email
      role
      statusSystem
      createdAt
      lastLogin
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken {
    refreshToken {
      message
      success
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout {
      message
      success
    }
  }
`;

export const SIGN_IN_MUTATION = `
    mutation SignIn($input: LoginUserInput!) {
        signIn(input: $input) {
            message
            success
        }
    }
`;

export const SIGN_UP_MUTATION = `
    mutation SignUp($input: RegisterUserInput!) {
        signUp(input: $input) {
            message
            success
        }
    }
`;

export const DELETE_CLIENT_MUTATION = `
    mutation DeleteClient($id: ID!) {
        deleteClient(id: $id) {
            message
            success
        }
    }
`;

export const LIST_CLIENT_ALL_QUERY = `
    query ListAllClients {
        listAllClients {
            id
            name
            email
            phone
            createdAt
            updatedAt
        }
    }
`;

export const REGISTER_CLIENT_MUTATION = `
    mutation RegisterClient($input: ClientInput!) {
        registerClient(input: $input) {
            message
            success
        }
    }
`;

export const UPDATE_CLIENT_MUTATION = `
    mutation UpdateClient($id: ID!, $input: ClientInput!) {
        updateClient(id: $id, input: $input) {
            message
            success
        }
    }
`;

export const LIST_CLIENT_COMBOBOX_QUERY = `
    query ListAllClientsMin {
        listAllClientsMin {
            id
            name
        }
    }
`;

export const LIST_ITEM_COMBOBOX_QUERY = `
    query ListAllItemsByCode($currentItemIds: [ID]) {
        listAllItemsByCode(currentItemIds: $currentItemIds) {
            id
            itemCode
            quantity
        }
    }
`;

export const DASHBOARD_STATS_QUERY = `
    query GetDashboardStats {
        getDashboardStats {
            totalRevenue
            totalClients
            pendingOrders
            totalItemsProduced
            salesChartData {
                date
                count
            }
            listAllRecentyActivity {
                name
                itemId
                methodPayment
                status
                dateOrder
            }
            listAllCategory {
                category
                quantity
            }
         }
    }
`;

export const DELETE_ORDER_GROUP_MUTATION = `
    mutation DeleteOrderGroup($clientId: ID!, $dateOrder: String!) {
        deleteOrderGroup(clientId: $clientId, dateOrder: $dateOrder) {
            message
            success
        }
    }
`;

export const LIST_ORDER_ALL_QUERY = `
    query ListAllOrders {
        listAllOrders {
            name
            email
            phone
            clientId
            totalPrice
            installments
            methodPayment
            status
            dateOrder
            dueDate
            itemsCount
            itemIds
        }
    }
`;

export const REGISTER_ORDER_MUTATION = `
    mutation RegisterOrder($input: OrderInput!) {
        registerOrder(input: $input) {
            message
            success
        }
    }
`;

export const UPDATE_ORDER_GROUP_MUTATION = `
    mutation UpdateOrderGroup($clientId: ID!, $dateOrder: String!, $input: OrderInput!) {
        updateOrderGroup(clientId: $clientId, dateOrder: $dateOrder, input: $input) {
            message
            success
        }
    }
`;

export const DELETE_ITEM_MUTATION = `
    mutation DeleteItem($id: ID!) {
        deleteItem(id: $id) {
            message
            success
        }
    }
`;

export const LIST_ALL_ITENS = `
    query ListAllItems {
        listAllItems {
            id
            code
            unitPrice
            totalPrice
            createdAt
        }
    }
`;

export const REGISTER_ITEMS_MUTATION = `
    mutation RegisterItems($input: ItemInput!) { 
        registerItems(input: $input) {
            message
            success
        }
    }
`;

export const UPDATE_ITEM_MUTATION = `
    mutation UpdateItem($id: ID!, $input: ItemInputUpdate!) {
        updateItem(id: $id, input: $input) {
            message
            success
        }
    }
`;

export const CHANGE_PASSWORD = `
    mutation ChangePasswordAdmin($email: String!, $input: ChangePasswordAdmin!) {
        changePasswordAdmin(email: $email, input: $input) {
            success
            message
        }
    }
`;

export const UPDATE_PROFILE = `
    mutation UpdateProfileAdmin($input: ProfileInput!) {
        updateProfileAdmin(input: $input) {
            success
            message
        }
    }
`;