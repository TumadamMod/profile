
// Tác giả: Nguyễn Cao Hoài 
// Website: nguyencaohoai.shop
// Facebook: Nguyễn Cao Hoài(Đen)
// Telegram: @nguyencaohoai77  

// vị trí cần thay // 
const firebaseConfig = {
  apiKey: "AIzaSyDGtRL0QgbrI8hvwQ_L_6Fz24pDyfWeBAo",
  authDomain: "testprofile-98c67.firebaseapp.com",
  databaseURL: "https://testprofile-98c67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testprofile-98c67",
  storageBucket: "testprofile-98c67.firebasestorage.app",
  messagingSenderId: "11261154784",
  appId: "1:11261154784:web:54af62b5f727fbe3c54785",
  measurementId: "G-KMQPPMGX1D"
};
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    function saveData() {
      const avatar = document.getElementById("avatarUrl").value.trim();
      const name = document.getElementById("userName").value.trim();

      if (avatar) {
        db.ref("avatar").set({ url: avatar });
      }
      if (name) {
        db.ref("user/name").set(name);
      }

      alert("✅ Đã lưu thông tin thành công!");
    }

     const welcomeInput = document.getElementById("welcomeInput");
    db.ref("tieude").once("value").then((snapshot) => {
      const value = snapshot.val();
      if (value) {
        welcomeInput.value = value;
      }
    });

    function updateWelcome() {
      const newText = welcomeInput.value.trim();
      if (newText === "") {
        alert("⚠️ Vui lòng nhập nội dung!");
        return;
      }
      db.ref("welcome").set(newText)
        .then(() => alert("✅ Đã cập nhật lời chào thành công!"))
        .catch((err) => alert("❌ Lỗi: " + err.message));
    }

    function updateMota() {
      const newText = document.getElementById('newText').value;
      const statusEl = document.getElementById('status');

      if (newText.trim() === '') {
        statusEl.textContent = "❗ Vui lòng nhập mô tả.";
        return;
      }

      db.ref('motanchoai').set(newText).then(() => {
        statusEl.textContent = "✅ Cập nhật thành công!";
      }).catch(err => {
        statusEl.textContent = "❌ Lỗi: " + err.message;
      });
    }

function saveMessage(messageId) {
    const messageContent = document.getElementById(messageId).value;

    if (messageContent) {
        db.ref(messageId).set(messageContent).then(() => {
            alert("Cập nhật thông báo thành công!");
        }).catch((error) => {
            alert("Có lỗi xảy ra: " + error.message);
        });
    } else {
        alert("Vui lòng nhập thông báo.");
    }
}

 function loadButtons() {
            db.ref("buttons").on("value", (snapshot) => {
                const data = snapshot.val();
                const buttonGroup = document.getElementById("button-group");

                buttonGroup.innerHTML = "";

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const buttonUrl = data[key];
                        const buttonElement = document.createElement("a");
                        buttonElement.href = buttonUrl;
                        buttonElement.textContent = ` ${key}`;
                        buttonElement.target = "_blank"; 

                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.classList.add("delete-btn");
                        deleteButton.onclick = () => deleteButtonHandler(key);

                        const divElement = document.createElement("div");
                        divElement.appendChild(buttonElement);
                        divElement.appendChild(deleteButton);

                        buttonGroup.appendChild(divElement);
                    }
                }
            });
        }

        function addButton() {
            const buttonName = document.getElementById("buttonName").value;
            const buttonUrl = document.getElementById("buttonUrl").value;

            if (buttonName && buttonUrl) {
                db.ref("buttons/" + buttonName).set(buttonUrl, (error) => {
                    if (error) {
                        console.log("Error adding button:", error);
                    } else {
                        loadButtons(); 
                    }
                });
            } else {
                alert("Please enter both button name and URL.");
            }
        }

        function deleteButtonHandler(buttonName) {
            db.ref("buttons/" + buttonName).remove((error) => {
                if (error) {
                    console.log("Error deleting button:", error);
                } else {
                    loadButtons(); 
                }
            });
        }

        window.onload = loadButtons;