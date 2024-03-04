// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'http://localhost:3000' : 'https://zizzamia.xyz';
