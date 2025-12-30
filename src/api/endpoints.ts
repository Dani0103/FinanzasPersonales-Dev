export const endpoints = {
    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
    },
    accounts: {
        list: "/api/accounts",
        create: "/api/accounts",
    },
    periods: {
        list: "/api/periods",
        create: "/api/periods",
    },
    movements: {
        list: "/api/movements",
        create: "/api/movements",
    },
    extras: {
        list: "/api/extras",
        create: "/api/extras",
    },
    payroll: {
        get: "/api/payroll",
        update: "/api/payroll"
    },
    deductions: {
        types: "/api/deductions/types",
        rules: "/api/deductions/rules",
        deleteRule: (id: number) => `/api/deductions/rules/${id}`,
    },
} as const;
