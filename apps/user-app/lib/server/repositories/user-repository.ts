import prisma from "@repo/db/client";

export class UserRepository {
  async findByPhone(phone: string) {
    return prisma.user.findFirst({ where: { phone } });
  }

  async findById(id: string) {
    return prisma.user.findFirst({ where: { id } });
  }

  async getProfileById(id: string) {
    return prisma.user.findFirst({
      where: { id },
      select: {
        phone: true,
        name: true,
      },
    });
  }
}
