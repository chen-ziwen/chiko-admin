export interface RequestInstanceState {
  errMsgStack: string[];
  refreshTokenFn: Promise<boolean> | null;
}
