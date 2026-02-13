import { z } from "zod";

const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,100}$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const ValidationInputs = {
  signIn: z.object({
    email: z.string().min(1, "O e-mail é obrigatório.").trim().email("Formato de e-mail inválido."),
    password: z.string().min(1, "A senha é obrigatória."),
  }),

  signUp: z.object({
    name: z.string().min(1, "Dados não informados.").trim().regex(NAME_PATTERN, "Nome inválido..."),
    email: z.string().min(1, "Dados não informados.").trim().email("E-mail em formato inválido."),
    password: z.string().regex(PASSWORD_PATTERN, "Mínimo 8 caracteres..."),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória."),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  }),

  item: z.object({
    code: z.string().min(1, "O código é obrigatório").trim().toUpperCase(),
    unitPrice: z.number({ message: "Informe um valor numérico" })
      .min(0.01, "O preço deve ser maior que zero"),
    quantity: z.number({ message: "Informe um número inteiro" })
      .min(1, "A quantidade mínima é 1")
      .int("A quantidade deve ser um número inteiro"),
    multiplyBy: z.number({ message: "Informe o multiplicador" })
      .min(1, "O multiplicador mínimo é 1"),
  }),

  itemUpdate: z.object({
    code: z.string().min(1, "O código é obrigatório").trim().toUpperCase(),
    unitPrice: z.number({ message: "Informe um valor numérico" })
      .min(0.01, "O preço deve ser maior que zero"),
    totalPrice: z.number({ message: "Informe um valor numérico" })
      .min(0.01, "O preço deve ser maior que zero"),
  }),

  client: z.object({
    name: z.string().min(1, "O nome é obrigatório").trim(),
    email: z.string().min(1, "O e-mail é obrigatório").trim().email("Formato de e-mail inválido."),
    phone: z.string().min(1, "O telefone é obrigatório").trim(),
  }),

  order: z.object({
    itemId: z.array(z.string()).min(1, "Selecione ao menos um item"),
    clientId: z.string().min(1, "Selecione um cliente"),
    methodPayment: z.enum(["SYSTEM", "CARD", "INSTALLMENT_PLAN", "LOYAL_CUSTOMER"], {
      message: "Selecione um método de pagamento"
    }),
    status: z.enum(["PENDING", "COMPLETED", "CANCELED", "IN_PROGRESS"], {
      message: "Selecione um status"
    }),
    dateOrder: z.date({
      message: "A data é obrigatória"
    }),
    installments: z.number({
      message: "Informe o número de parcelas"
    }).int().min(1, "Mínimo de 1 parcela"),
    discount: z.coerce.number({ message: "Informe um número" })
      .min(0, "O desconto não pode ser negativo"),
    dueDate: z.string().min(1, "Selecione o dia de vencimento"),
  }).superRefine((data, ctx) => {
    if (data.methodPayment === "SYSTEM" && data.installments > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Pix permite apenas 1x",
        path: ["installments"],
      });
    }
    if (data.methodPayment === "INSTALLMENT_PLAN" && data.installments > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Crediário permite no máximo 3x",
        path: ["installments"],
      });
    }
    if (data.methodPayment === "CARD" && data.installments > 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cartão permite no máximo 6x",
        path: ["installments"],
      });
    }
    if (data.methodPayment === "LOYAL_CUSTOMER" && data.installments > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cliente Fidelizado permite apenas 1x",
        path: ["installments"],
      });
    }
  }),
};

export type SignUpType = z.infer<typeof ValidationInputs.signUp>;
export type SignInType = z.infer<typeof ValidationInputs.signIn>;
export type ItemFormType = z.infer<typeof ValidationInputs.item>;
export type OrderFormType = z.infer<typeof ValidationInputs.order>;