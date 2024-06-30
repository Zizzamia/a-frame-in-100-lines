// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://zizzamia.xyz';
export const PLAYER_A_CONTRACT_ADDR = '';
export const STABLE_CONTRACT_ADDR = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
export const BAL_VAULT_ADDR = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
