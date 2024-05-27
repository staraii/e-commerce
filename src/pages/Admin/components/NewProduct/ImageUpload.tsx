import styles from "./new-product.module.css";
import { useState } from "react";
import { SelectedFiles } from "types/productTypes";

interface ImageUploadProps {
	uploadedFiles: SelectedFiles;
	setUploadedFiles: React.Dispatch<React.SetStateAction<SelectedFiles>>;
}

// Bestämmer max antal bilder som kan laddas upp
const MAX_UPLOAD_COUNT = 5;

function ImageUpload({uploadedFiles, setUploadedFiles}: ImageUploadProps) {
	const [fileLimit, setFileLimit] = useState<boolean>(false);
	const [previewImages, setPreviewImages] = useState<boolean>(true);
	
	// Hanterar val av bilder
	const handleFileSelection = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
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
		// TODO: Lägga till annan respons till anvädare
				alert(`Maximum number of images: ${MAX_UPLOAD_COUNT}`);
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

	};

	return (
		<div className={styles.imgDiv}>
			<input
				type="file"
				id="fileUpload"
				multiple
				accept=".jpg, .jpeg, .png"
				className={styles.fileInput}
				onChange={handleFileSelection}
				disabled={fileLimit}
				hidden
			/>
			<label htmlFor="fileUpload" className={styles.label}>
				<a className={styles.uploadLink}>Välj filer</a>
			</label>
			{uploadedFiles.length > 0 && (
				<ul className={styles.imgUl}>
					
					<li onClick={() => setPreviewImages(!previewImages)}>
						{previewImages ? "Hide previews" : "Show previews"}
					</li>
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
									<p className={styles.previemFileName}>
										Filename: {file.name}
									</p>
									<button
										type="button"
										onClick={() => deleteImage(file)}
										className={styles.deleteButton}
									>
										Delete
									</button>
								</li>
							);
						})}
				</ul>
			)}
		</div>
	);
}

export default ImageUpload