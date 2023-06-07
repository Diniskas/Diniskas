

const firebaseConfig = {
  apiKey: "AIzaSyBfsynMxshKRh09huTY11iTWukhIwvzRtg",
  authDomain: "enchancer-608c6.firebaseapp.com",
  projectId: "enchancer-608c6",
  storageBucket: "enchancer-608c6.appspot.com",
  messagingSenderId: "976705059444",
  appId: "1:976705059444:web:49f1368926d04cd279ef21"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const registerButton = document.querySelector(".btn-register");
const loginButton = document.querySelector(".btn-login");

registerButton.addEventListener("click", handleRegisterClick);
loginButton.addEventListener("click", handleLoginClick);

function handleRegisterClick() {
  const modal = document.getElementById("registerModal");
  $(modal).modal("show");

  const usernameInput = document.getElementById("usernameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  const registerButtonModal = document.getElementById("registerButtonModal");
  registerButtonModal.addEventListener("click", async () => {
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      // Реєстрація користувача за допомогою Firebase
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Опціонально: оновлення профілю користувача з іншими даними, наприклад, ім'ям користувача
      await user.updateProfile({
        displayName: username
      });

      console.log("Registered User:");
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      $(modal).modal("hide");
    } catch (error) {
      console.log("Registration Error:", error);
    }
  });
}

function handleLoginClick() {
  // Реалізуйте код для входу користувача
}

function encrypt() {
  const text = document.getElementById("text").value;
  const password = document.getElementById("password").value;

  // Encrypt the text using the user's password.
  const encryptedText = CryptoJS.AES.encrypt(text, password);

  // Create a modal dialog for displaying the encrypted text.
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Encrypted Text</h5>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <textarea class="form-control" rows="5" readonly>${encryptedText}</textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;

  // Show the modal dialog.
  document.body.appendChild(modal);
  $(modal).modal("show");
}

function decrypt() {
  const encryptedText = document.getElementById("text").value;
  const password = document.getElementById("password").value;

  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, password);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // Create a modal dialog for displaying the decrypted text.
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Decrypted Text</h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <textarea class="form-control" rows="5" readonly>${decryptedText}</textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Show the modal dialog.
    document.body.appendChild(modal);
    $(modal).modal("show");
  } catch (error) {
    showDecryptionErrorModal();
  }
}








