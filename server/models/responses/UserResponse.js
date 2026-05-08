export function UserResponse(user) {
    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role?.role_name,
        branch: user.branch?.name,
        status: user.status,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt
    };
};

export function UserListResponse(users, pagination) {
    return {
        
        users: Array.isArray(users) ? users.map(UserResponse) : [],
        pagination: {
            total: pagination?.total || 0,
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
            totalPages: pagination?.totalPages || 0
        }
    };
};

export default {
    UserResponse,
    UserListResponse
}