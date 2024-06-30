// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://blpframe.vercel.app';
export const PLAYER_A_CONTRACT_ADDR = '';
export const STABLE_CONTRACT_ADDR = '';
export const BAL_VAULT_ADDR = '0xba12222222228d8ba445958a75a0704d566bf2c8';
