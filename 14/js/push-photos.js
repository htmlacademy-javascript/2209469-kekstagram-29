const FILE_FORMATS = ['gif', 'jpg', 'jpeg', 'png'];

const imgUpload = document.querySelector('.img-upload');
const uploadFile = imgUpload.querySelector('#upload-file');
const preview = imgUpload.querySelector('.img-upload__preview img');
const images = imgUpload.querySelectorAll('span');


uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_FORMATS.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      images.forEach((evt) => {
        evt.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
});
