const bcrypt = require("bcryptjs");

const password = "12345678";
const hashedPassword =
  "$2a$12$YsPpWLno504V3X.zd4Saie97B3DlOuBXl3R7lJgWno4veV9pvWwYO"; // Change this to match your logged hashed password

async function testBcrypt() {
  try {
    const hash = await bcrypt.hash(password, 12);
    console.log("Hashed Password:", hash);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password Match:", isMatch);
  } catch (err) {
    console.error("Error:", err);
  }
}

testBcrypt();
