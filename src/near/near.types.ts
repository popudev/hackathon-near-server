export interface NearContract {
  [methodName: string]: (props?: { args?: Record<any, any>; gas?: number; amount?: number }) => Promise<any>;
}
