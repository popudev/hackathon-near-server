export interface NearContract {
  [methodName: string]: (args?: Record<string, string>, gas?: number, amount?: number) => Promise<any>;
}
