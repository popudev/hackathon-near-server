export interface NearContract {
  [methodName: string]: (args?: Record<string, any>, gas?: number, amount?: number) => Promise<any>;
}
