export interface NearContract {
  [methodName: string]: (props?: { args?: Record<string, string>; gas?: number; amount?: number }) => Promise<any>;
}
