interface IServerConfig {
    NEXT_PUBLIC_SELF_URL: string,
}

export const serverConfig = {
    NEXT_PUBLIC_SELF_URL: process.env.NEXT_PUBLIC_SELF_URL
} as IServerConfig

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export function isProd() {
    return process.env.NODE_ENV === 'production'
}
