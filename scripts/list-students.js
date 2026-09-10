// Prints every student's exact stored matricNumber, for debugging login issues.
// Run with: node scripts/list-students.js

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const students = await prisma.student.findMany({
    select: { id: true, firstName: true, lastName: true, matricNumber: true },
    orderBy: { createdAt: "desc" },
  });

  if (students.length === 0) {
    console.log("No students found in the database.");
    return;
  }

  console.log(`Found ${students.length} student(s):\n`);
  students.forEach((s) => {
    console.log(`ID ${s.id}: ${s.firstName} ${s.lastName}`);
    console.log(`  matricNumber: "${s.matricNumber}"`);
    console.log("");
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());