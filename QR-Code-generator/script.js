function generateQR(event) {
  event.preventDefault();
  let text = document.getElementById("textInput").value;
  console.log(text);
  let qrImage = document.getElementById("qrImage");

  if (text.trim() !== "") {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
  } else {
    setTimeout(() => {
      alert("Please enter some text!");
    }, 150); // Small delay to allow button animation
  }
}
