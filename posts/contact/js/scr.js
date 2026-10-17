const scriptURL = "https://script.google.com/macros/s/AKfycbxsdfb9-0wySFa4WISY22Rx9wzDtcVVgkrA_amK6Sej6Wl_TDm2zvc4I8X_HUrJRpcp/exec";
const form = document.forms["submit-to-google-sheet"];
const btnKirim = document.querySelector('.sub');
const btnLoading = document.querySelector('.load');
const myAlert = document.querySelector('.my-alert');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //ketika tombol submit diklik
  //tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle('d-none');
  btnKirim.classList.toggle('d-none');
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      //tampilkan tombol kirim, hilangkan tombol loading
      btnLoading.classList.toggle('d-none');
      btnKirim.classList.toggle('d-none');
      //tampilkan myAlert
      myAlert.classList.toggle('d-none');
      //reset forms
      console.log("Success!", response)
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
