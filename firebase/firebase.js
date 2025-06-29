/* Admin: Nguyễn Cao Hoài 
Website: nguyencaohoai.shop
Telegram: @nguyencaohoai77
VUI LÒNG TÔN TRỌNG TÁC GIẢ!  */
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
  
      db.ref("avatar").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data && data.url) {
          document.getElementById("avatarImage").src = data.url;
        }
      });
      db.ref("user/name").on("value", (snapshot) => {
        const name = snapshot.val();
        if (name) {
          document.getElementById("userName").textContent = name;
        }
      }); 
  
      db.ref('motanchoai').once('value').then(snapshot => {
    const text = snapshot.val();
    console.log("Dữ liệu từ motanchoai:", text);  
    if (text) {
      const textEl = document.getElementById('animatedText');
      textEl.textContent = '';
  
    
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.classList.add('char');
        textEl.appendChild(span);
      }
  
      const chars = document.querySelectorAll('.char');
  
      function typeText() {
        chars.forEach((char, index) => {
          setTimeout(() => {
            char.classList.add('visible');
          }, index * 100);
        });
  
       
        setTimeout(() => {
          deleteText();
        }, chars.length * 100 + 2000);
      }
  
      function deleteText() {
        const total = chars.length;
        chars.forEach((char, index) => {
          setTimeout(() => {
            char.classList.remove('visible');
          }, (total - index - 1) * 100);
        });
  
        
        setTimeout(() => {
          typeText();
        }, total * 100 + 1000);
      }
  
     
      typeText();
    } else {
      console.log("Không có dữ liệu từ motanchoai");
    }
  });
  ;
  
  db.ref("tb1").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById("tb1").textContent = data;
    } else {
      document.getElementById("tb1").textContent = '';
    }
  });
  
  db.ref("tb2").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById("tb2").textContent = data;
    } else {
      document.getElementById("tb2").textContent = '';
    }
  });
  
  
  function loadButtons() {
      db.ref("buttons").on("value", (snapshot) => {
          const data = snapshot.val();
          const buttonGroup = document.getElementById("button-group");
  
          
          buttonGroup.innerHTML = "";
  
         
          const keys = Object.keys(data).reverse(); 
keys.forEach((key) => {
    const buttonUrl = data[key];
    const buttonElement = document.createElement("a");
    buttonElement.href = buttonUrl;
    buttonElement.textContent = ` ${key}`;
    buttonElement.target = "_blank"; 
    buttonGroup.appendChild(buttonElement);
});
      });
  }
  
  window.onload = function() {
      loadButtons();
  };