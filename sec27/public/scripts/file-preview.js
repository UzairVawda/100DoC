const imagePreview = document.getElementById('imgPreview')
const filePicker = document.getElementById('image')

function showPreview(e) {
	const files = filePicker.files;
	if (!files || files.length === 0) {
		imagePreview.style.display = 'none'
		return
	}
	const pickedFile = files[0];
	imagePreview.style.display = 'block'
	imagePreview.src = URL.createObjectURL(pickedFile)
}

filePicker.addEventListener('change', showPreview);