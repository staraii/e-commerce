
export interface ProductInput {
	name: string;
	description: string;
	price: number;
	category: Category;
	xs: number;
	s: number;
	m: number;
	l: number;
	xl: number;
	xxl: number;
	oneSize: number;
	[key: string]: number | string;
}
// Storlekar
export type Sizes = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "oneSize";

// Produktkategorier
export const ALL_CATEGORIES = ["Tröjor", "Byxor", "Hattar", "Skor"] as const;
export type CategoryTuple = typeof ALL_CATEGORIES;
export type Category = CategoryTuple[number];

// För validering av produktformulär
export type Touched = Partial<Record<keyof ProductInput, boolean>>;
// För felmeddelanden vid validering av produktformulär
export type Errors = Partial<Record<keyof ProductInput, string | number>>;

// Valda bilder att spara till produkter
export type SelectedFiles = Array<File>;
