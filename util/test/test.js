const bcrypt = require("bcryptjs");

async function testBcrypt() {
  const plainPassword = "12345678";
  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  console.log("Hashed Password:", hashedPassword);

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("Password Match:", isMatch);
}

testBcrypt();
