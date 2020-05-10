export interface Person {
  name: string;
  email: string;
  phone: string;
}

export interface PersonWithId extends Person {
  id: string;
}
