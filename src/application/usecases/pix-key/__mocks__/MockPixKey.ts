import { PixKey } from "../../../../domain/entities/PixKey";

export const mockPixKey: PixKey = {
    bank: "Banco itau",
    owner: "Hebert santos",
    key: "hebert santos developer@gmail.com",
    type: "EMAIL",
    userId: "2939484485743"
};

export const mockPixKeys: PixKey[] = [
    {
        key: "09969604570",
        type: "CPF",
        userId: "4949585849394",
        owner: "Hebert santos",
        bank: "Banco Itau"
    }
];
