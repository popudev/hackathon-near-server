export interface NearContract {
  [methodName: string]: (...args: any[]) => Promise<any>;
}
