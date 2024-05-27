import styles from "./image-upload.module.css";
import { useState } from "react";
import { SelectedFiles } from "types/productTypes";
import { toast, ToastOptions } from "react-toastify";

interface ImageUploadProps {
	uploadedFiles: SelectedFiles;
	setUploadedFiles: React.Dispatch<React.SetStateAction<SelectedFiles>>;
}

// Bestämmer max antal bilder som kan laddas upp
const MAX_UPLOAD_COUNT = 5 as const;
const allowedTypes = ["image/jpeg", "image/png"] as const;

function ImageUpload({uploadedFiles, setUploadedFiles}: ImageUploadProps) {
	const [fileLimit, setFileLimit] = useState<boolean>(false);
	const [previewImages, setPreviewImages] = useState<boolean>(true);
	const [errors, setErrors] = useState<string | null>(null);
	const notifyWithOptions = (message: string, options: ToastOptions) => {
		toast(message, options);
	}
	const sortImages = (indexOne: number, indexTwo: number) => {
		if (uploadedFiles.length < 2) {
			return;
		} else if (indexOne > indexTwo && indexOne < 1) {
			return
		} else if (indexOne < indexTwo && indexOne === uploadedFiles.length - 1) {
			return;
		}
		const arr = [...uploadedFiles];
		[arr[indexOne], arr[indexTwo]] = [arr[indexTwo], arr[indexOne]];
		setUploadedFiles(arr);
	}
	// Hanterar val av bilder
	const handleFileSelection = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setErrors(null);
		// Om inga filer är valda, return
		if (!event.target.files) {
			return;
		}
		// Skapar en tom array, att använda för jämförelser
		let selectedFiles: SelectedFiles = [];
		// Om det finns valda filer i state, lägg till dom i den tomma arrayen
		if (uploadedFiles.length > 0) {
			selectedFiles = [...uploadedFiles];
		}
		let limitExceeded = false;
		// Skapar en ny array med de senast valda filerna
		const filesArray = Array.prototype.slice.call(event.target.files);
		filesArray.some((file) => {
			if (!allowedTypes.includes(file.type)) {
				//invalidFileType();
				notifyWithOptions("Unvalid file type, please select jpg/png.", {type: "info", position: "top-center", autoClose: 2000});
				return;
			}
			// Om vald fil inte redan finns, pusha till arrayen
			if (selectedFiles.findIndex((f) => f.name === file.name) === -1) {
				selectedFiles.push(file);
			}
			// Om max antal valda filer, ändra state fileLimit
			if (selectedFiles.length === MAX_UPLOAD_COUNT) {
				setFileLimit(true);
			}
			// Om fler än max antal, ändra state fileLimit till false, limitExceeded till true
			if (selectedFiles.length > MAX_UPLOAD_COUNT) {	
				setFileLimit(false);
				limitExceeded = true;
				setErrors("Allowed number of files excceded");
				return true;
			}
		});
		if (!limitExceeded) {
			// Om inte maxgräns överträds, uppdatera state med den skapade arrayen
			setUploadedFiles(selectedFiles);
		}
	};
	// Ta bort bild från listan med valda filer
	const deleteImage = (delImg: File) => {
		// Skapar en ny array med alla bilder förutom den valda
		const filteredArray = uploadedFiles.filter((img) => img.name != delImg.name);
		// Uppdaterar state uploadedFiles med den filtrerade arrayen utan den valda bilden
		setUploadedFiles(filteredArray)
		notifyWithOptions(`Image: ${delImg.name}, deleted.`, {type: "success", position: "top-center", autoClose: 2000})

	};
	const getFileSize = (size: number) => {
		if (size < 1024) {
			return `${size} bytes`;
		} else if (size >= 1024 && size < 1048576) {
			return `${(size / 1024).toFixed(1)} KB`;
		} else if (size >= 1048576) {
			return `${(size / 1048576).toFixed(1)} MB`;
		}
	}

	return (
		<div className={styles.imgDiv}>
			<h4 className={styles.h4}>Add product images </h4>
			<input
				type="file"
				id="fileUpload"
				multiple
				accept=".jpg, .jpeg, .png"
				className={styles.fileInput}
				onChange={handleFileSelection}
				disabled={fileLimit}
			/>
			<label htmlFor="fileUpload" className={styles.label}>
				<a className={styles.uploadLink}>Choose images</a>
				<button
					type="button"
					onClick={() => setPreviewImages(!previewImages)}
					className={styles.previewButton}
				>
					{previewImages ? "Hide previews" : "Show previews"}
				</button>
			</label>
			<p className={styles.pUploadedCount}>
				{uploadedFiles.length} / {MAX_UPLOAD_COUNT}
			</p>
			<p className={styles.imageErrors}>{errors ? errors : null}</p>
			{uploadedFiles.length > 0 && (
				<ul className={styles.imgUl}>
					{previewImages &&
						uploadedFiles.map((file, index) => {
							return (
								<li
									key={file.name}
									className={styles.previewImgLi}
								>
									<img
										className={styles.previewImg}
										src={URL.createObjectURL(
											uploadedFiles[index]
										)}
									/>
									<div className={styles.imgPreviewDetails}>
										<p className={styles.previemFileName}>
											<b>{index + 1}.</b>
										</p>
										<p className={styles.previewFileName}>
											Filename: {file.name}
										</p>
										<p className={styles.previewFileName}>
											Filesize: {getFileSize(file.size)}
										</p>
										<div className={styles.buttonsDiv}>
											<button
												type="button"
												onClick={() =>
													deleteImage(file)
												}
												className={styles.deleteButton}
											>
												Delete
											</button>
											{/* Up */}
											<button
												className={styles.arrowButton}
												onClick={() =>
													sortImages(index, index - 1)
												}
											>
												&#8743;
											</button>
											{/* Down */}
											<button
												className={styles.arrowButton}
												onClick={() =>
													sortImages(index, index + 1)
												}
											>
												&#8744;
											</button>
										</div>
									</div>
								</li>
							);
						})}
				</ul>
			)}
		</div>
	);
}

export default ImageUpload