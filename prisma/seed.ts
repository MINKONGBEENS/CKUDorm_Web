import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 관리자 계정 생성
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ckudorm.ac.kr' },
    update: {},
    create: {
      email: 'admin@ckudorm.ac.kr',
      name: '관리자',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // 테스트 학생 데이터 생성
  const students = [
    {
      studentId: '20240001',
      name: '김철수',
      department: '컴퓨터공학과',
      roomNumber: '101',
      phoneNumber: '010-1234-5678',
      meritPoints: 5,
      demeritPoints: 2,
    },
    {
      studentId: '20240002',
      name: '이영희',
      department: '경영학과',
      roomNumber: '102',
      phoneNumber: '010-2345-6789',
      meritPoints: 3,
      demeritPoints: 1,
    },
    {
      studentId: '20240003',
      name: '박민수',
      department: '전자공학과',
      roomNumber: '103',
      phoneNumber: '010-3456-7890',
      meritPoints: 2,
      demeritPoints: 4,
    },
  ]

  for (const student of students) {
    const createdStudent = await prisma.student.upsert({
      where: { studentId: student.studentId },
      update: {},
      create: student,
    })

    // 상벌점 이력 생성
    if (student.meritPoints > 0) {
      await prisma.pointHistory.create({
        data: {
          studentId: createdStudent.id,
          type: 'MERIT',
          points: student.meritPoints,
          reason: '봉사활동 참여',
        },
      })
    }

    if (student.demeritPoints > 0) {
      await prisma.pointHistory.create({
        data: {
          studentId: createdStudent.id,
          type: 'DEMERIT',
          points: student.demeritPoints,
          reason: '외출 규정 위반',
        },
      })
    }
  }

  console.log('시드 데이터가 성공적으로 생성되었습니다.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 