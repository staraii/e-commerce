import { useState, useEffect } from "react";
import { ProductInput, Category, ALL_CATEGORIES, Errors, Touched, Sizes } from "types/productTypes";


// RegExp, validerar pris, godkänt format är 0 men ej t.ex. 01, heltal eller 2 decimaler.
const priceReg = new RegExp("^[1-9][0-9]*(?:[.]d{2}|$)$");
// RegExp, validerar antal, godkänt format är 0 men ej 01, annars tal som börjar på 1-9, endast heltal.
const quantityReg = new RegExp("^([1-9][0-9]*)|([0])$");

// Storlekar
const sizes: Sizes[] = ["xs", "s", "m", "l", "xl", "xxl", "oneSize"];

export const useValidateProduct = (product: ProductInput, touched: Touched) => {
	const [errors, setErrors] = useState<Errors>({});
	const [isValid, setIsValid] = useState<boolean>(false);
	function isCategory(value: string): value is Category {
	return ALL_CATEGORIES.includes(value as Category)
	}
	useEffect(() => {
		const validate = (product: ProductInput, touched: Touched): Errors => {

			const newErrors: Errors = {};
				
			if (touched.name && product.name.length < 3) {
				newErrors.name = "Ange ett längre produktnamn";
			}
			if (touched.description && product.description.length < 25) {
				newErrors.description = "Ange en längre produktbeskrivning";
			}
			if (touched.price && !priceReg.test(product.price.toString())) {
				newErrors.price = "Ange korrekt pris";
			}
			if (touched.category && !isCategory(product.category)) {
				newErrors.category = "Ange en giltig kategori";
			}
			sizes.forEach((size) => {
				if (!quantityReg.test(product[size].toString())) {
					newErrors[size] = "Ange ett lagersaldo i heltal"
				}
			})
			if (Object.keys(newErrors).length === 0 && Object.keys(touched).length === 3) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
			return newErrors;
			};
		setErrors(validate(product, touched));
	}, [product, touched]);
	return { errors, isValid };
};
