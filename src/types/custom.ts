export interface FormActionState<T> {
  data?: T;
  message: string;
  success: boolean | null;
}