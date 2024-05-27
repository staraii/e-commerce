import { useState, useEffect } from "react";
import { Errors, Gender, Category,  InitialProductState } from "types/productTypes";


// RegExp, validerar pris, godkänt format är 0 men ej t.ex. 01, heltal eller 2 decimaler.
const priceReg = new RegExp("^[1-9][0-9]*(?:[.][0-9][0-9]|$)$");
// RegExp, validerar antal, godkänt format är 0 men ej 01, annars tal som börjar på 1-9, endast heltal.
const quantityReg = new RegExp("^([1-9][0-9]*)|([0])$");

export const useValidateProduct = (product: InitialProductState, categories: Category[], genders: Gender[]) => {
	const [errors, setErrors] = useState<Errors>({});
	const [isValid, setIsValid] = useState<boolean>(false);
	useEffect(() => {
		const validate = (product: InitialProductState): {[key: string]: string} => {

			const newErrors: {[key:string]: string} = {};
				
			// if (touched.name && product.name.length < 3) {
			// 	newErrors.name = "Please enter a longer product name";
			// }
			// if (touched.description && product.description.length < 25) {
			// 	newErrors.description = "Please enter a longer product description";
			// }
			// if (touched.brand && product.brand.length < 1) {
			// 	newErrors.brand = "Please enter a product brand"
			// }
			// if (touched.price && !priceReg.test(product.price)) {
			// 	newErrors.price = "Please enter a valid price, 1, 1.11, 0,11 are acceptable formats";
			// }
			// if (touched.gender && !genders.includes(product.gender)) {
			// 	newErrors.gender = "Please enter valid gender category";
			// }
			// if (touched.category && !categories.includes(product.category)) {
			// 	newErrors.category = "Please enter a valid product category";
			// }
			if (product.name.length < 3) {
				newErrors.name = "Please enter a longer product name";
			}
			if (product.description.length < 25) {
				newErrors.description =
					"Please enter a longer product description";
			}
			if (product.brand.length < 1) {
				newErrors.brand = "Please enter a product brand";
			}
			if (!priceReg.test(product.price)) {
				newErrors.price =
					"Please enter a valid price, 1, 1.11, 0,11 are acceptable formats";
			}
			if (!genders.includes(product.gender)) {
				newErrors.gender = "Please enter valid gender category";
			}
			if (!categories.includes(product.category)) {
				newErrors.category = "Please enter a valid product category";
			}
			product.sizes.forEach((size) => {
				console.log("size", size)
				if (Object.keys(product.stock).includes(size)) {
					if (!quantityReg.test(product.stock[size])) {
						newErrors[size] = "Please enter a valid quantity";
						newErrors.sizes = "Please enter a valid quantity";
					}
				}
			})
			if (
				Object.keys(newErrors).length === 0) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
			return newErrors;
			};
		setErrors(validate(product));
	}, [product]);
	return { errors, isValid };
};
