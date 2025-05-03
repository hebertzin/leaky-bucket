export type PixKeyType = 'CPF' | 'CNPJ' | 'PHONE' | 'EMAIL' | 'EVP';

export interface PixKey {
  key: string;
  type: PixKeyType;
  userId?: string;
  owner?: string;
  bank: string;
}
