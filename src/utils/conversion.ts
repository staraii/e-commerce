import { StringObject, NumberObject } from "src/types/productTypes";


export const stringsArrToNumbersArr = (arr: StringObject[]): NumberObject[] => {
	return arr.map(obj => {
		const newObj: NumberObject = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = Number(obj[key]);
			}
		}
		return newObj;
	})
}

export const numbersArrToStringsArr = (arr: NumberObject[]): StringObject[] => {
	return arr.map(obj => {
		const newObj: StringObject = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = obj[key].toString();
			}
		}
		return newObj;
	})
}