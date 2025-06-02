import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// GET /api/students
export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/students
export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const student = await prisma.student.create({
      data: {
        studentId: body.studentId,
        name: body.name,
        department: body.department,
        roomNumber: body.roomNumber,
        phoneNumber: body.phoneNumber,
      }
    })
    return NextResponse.json(student)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 