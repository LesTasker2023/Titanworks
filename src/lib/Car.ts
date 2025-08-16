// TypeScript utility type demo for Partial<Car> and Pick<Car, ...>

export type Car = {
  name: string;
  color: string;
  doors: number;
  engineSize: number;
  wheels: number;
};

// Example: Partial<Car> allows any subset of properties
export const carUpdate: Partial<Car> = { name: 'Cybertruck', wheels: 6 };

// Example: Pick<Car, "name" | "wheels"> requires both properties
export type CarNameAndWheels = Pick<Car, 'name' | 'wheels'>;
export const carEssentials: CarNameAndWheels = { name: 'Roadster', wheels: 4 };

// Project application: Use Partial<Car> for update/patch scenarios, Pick<Car, ...> for minimal required fields.
