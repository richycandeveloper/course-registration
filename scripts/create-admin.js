// One-off script to create an admin account.
// Run with: node scripts/create-admin.js "Admin Name" "admin@imt.edu.ng" "yourpassword"

require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const [, , name, email, password] = process.argv;

  if (!name || !email || !password) {
    console.log('Usage: node scripts/create-admin.js "Admin Name" "admin@imt.edu.ng" "yourpassword"');
    process.exit(1);
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`An admin with email ${email} already exists.`);
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: { name, email: email.toLowerCase(), password: hashed },
  });

  console.log("Admin account created successfully:");
  console.log({ id: admin.id, name: admin.name, email: admin.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());