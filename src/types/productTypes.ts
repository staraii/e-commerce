import { Timestamp } from "@firebase/firestore-types";


export interface Product{
	id: string;
	name: string;
	description: string;
	brand: string;
	price: number;
	gender: Gender;
	category: Category;
	stock: [StockSize]
	images: string[]
	productAdded: Timestamp;
	[key: string]: number | string | StockSize[] | string[] | Timestamp;
}

export interface InitialProductState {
	name: string;
	description: string;
	brand: string;
	price: string;
	gender: Gender;
	category: Category;
	sizes: string[];
	stock: Record<string, string>;
	//stock: Stock;
}

export type StringObject = {
	[key: string]: string;
};

export type NumberObject = {
	[key: string]: number;
};

export type Stock = {
	key: string;
}
export type Sizes = { [key: string]: string };
export type StockSize = { [key: string]: string };
export type Gender = string;
export type Category = string;

export type Errors = { [key: string]: string };
export type Touched = { [key: string]: boolean };
// För validering av produktformulär
//export type Touched = Partial<Record<keyof InitialProductState, boolean>>;
//7export type Touched = Record<keyof InitialProductState, boolean>;
// För felmeddelanden vid validering av produktformulär
//export type Errors = Partial<Record<keyof InitialProductState, string | number>>;
// Valda bilder att spara till produkter
export type SelectedFiles = Array<File>;

















