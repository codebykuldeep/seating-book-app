export type AlertType = 'success' | 'info' | 'warning' | 'error' | undefined;

export interface SnackType{
    open:boolean;
    status:AlertType;
    message:string;
}