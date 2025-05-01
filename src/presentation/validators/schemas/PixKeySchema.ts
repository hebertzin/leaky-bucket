import { z } from "zod";

const PixKeyTypeEnum = z.enum(['CPF', 'CNPJ', 'PHONE', 'EMAIL', 'EVP']);

const validators: Record<
    z.infer<typeof PixKeyTypeEnum>,
    (key: string) => boolean
> = {
    CPF: (key) => /^\d{11}$/.test(key),
    CNPJ: (key) => /^\d{14}$/.test(key),
    PHONE: (key) => /^\+\d{1,3}\d{8,13}$/.test(key),
    EMAIL: (key) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key),
    EVP: (key) => /^[0-9a-f]{32}$/i.test(key),
};

const errorMessages: Record<z.infer<typeof PixKeyTypeEnum>, string> = {
    CPF: 'Invalid CPF format (expected 11 digits)',
    CNPJ: 'Invalid CNPJ format (expected 14 digits)',
    PHONE: 'Invalid phone format (expected format +5511999999999)',
    EMAIL: 'Invalid email format',
    EVP: 'Invalid EVP format (expected 32-character hex string)',
};

export const pixKeySchema = z.object({
    key: z.string(),
    type: PixKeyTypeEnum,
    userId: z.string(),
    owner: z.string().min(1, { message: "Owner is required" }),
    bank: z.string().min(1, { message: "Bank is required" }),
}).superRefine((data, ctx) => {
    const validator = validators[data.type];
    if (!validator(data.key)) {
        ctx.addIssue({
            path: ['key'],
            code: z.ZodIssueCode.custom,
            message: errorMessages[data.type],
        });
    }
}); 
