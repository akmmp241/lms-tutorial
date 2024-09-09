const {PrismaClient} = require("@prisma/client");


const db = new PrismaClient()

async function main() {
  console.info('start')

  try {
    await db.category.createMany({
      data: [
        {name: "Computer Science"},
        {name: "Music"},
        {name: "Fitness"},
        {name: "Photography"},
        {name: "Accounting"},
        {name: "Engineering"},
        {name: "Filming"},
      ]
    })

    console.info('success')
  } catch (error) {
    console.error("Error seeding the database categories", error)
  } finally {
    await db.$disconnect()
  }

  console.info('end')
}

main()