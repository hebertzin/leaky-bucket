export type Authentication = {
    email: string;
    password: string;
  };
  
  export type Token = {
    token: string;
  };
  
  export interface Login {
    execute(data: Authentication): Promise<Token>;
  }