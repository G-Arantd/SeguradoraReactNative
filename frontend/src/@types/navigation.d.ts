export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      infos: {
        user: string;
      };
      vehicle: {
        user: string;
        age: number;
      };
      budget: {
        user: string;
        age: number;
        vehicle: string;
        year: number;
      };
    }
  }
}
