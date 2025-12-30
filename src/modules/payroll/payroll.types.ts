export type PayrollResp = {
    profile: { base_salary: number; variable_percent: number };
    summary: {
        basic: number;
        variable: number;
        total_income: number;
        total_deductions: number;
        net: number;
    };
    deductions: { code: string; label: string; amount: number }[];
};

export const money = (n: number) => n.toLocaleString("es-CO");
