export function LoginResponse({ user, accessToken, refreshToken, expiresIn }) {
    return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role?.role_name,
          branch: user.branch?.name,
          status: user.status,
          lastLogin: user.lastLoginAt ,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn
    };
}