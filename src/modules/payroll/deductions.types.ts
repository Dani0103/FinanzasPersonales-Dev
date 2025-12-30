export type DeductionType = { id: number; code: string; label: string };

export type DeductionRule = {
    id: number;
    deduction_type_id: number;
    code: string;
    label: string;
    calc_mode: "PERCENT" | "FIXED";
    value: number;
    effective_from: string;
    effective_to: string | null;
};
