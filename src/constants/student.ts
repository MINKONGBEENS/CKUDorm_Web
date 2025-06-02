export const STUDENT_STATUS = {
  ENROLLED: '재학',
  LEAVE: '휴학',
  GRADUATED: '졸업',
  MOVING_OUT: '퇴사예정',
  MOVED_OUT: '퇴사완료',
  LIVING_IN: '입주중'
} as const;

export type StudentStatus = typeof STUDENT_STATUS[keyof typeof STUDENT_STATUS];

export const STUDENT_GRADE = {
  FIRST: '1',
  SECOND: '2',
  THIRD: '3',
  FOURTH: '4'
} as const;

export type StudentGrade = typeof STUDENT_GRADE[keyof typeof STUDENT_GRADE];

export const POINT_TYPE = {
  MERIT: '상점',
  DEMERIT: '벌점'
} as const;

export type PointType = typeof POINT_TYPE[keyof typeof POINT_TYPE];

export const POINT_REASON = {
  // 상점 사유
  MERIT: {
    VOLUNTEER: '봉사활동',
    CLEAN: '청소 우수',
    EVENT_PARTICIPATION: '행사 참여',
    GOOD_MANNER: '모범적인 행동',
    OTHER_MERIT: '기타 상점'
  },
  // 벌점 사유
  DEMERIT: {
    NOISE: '소음 발생',
    LATE_RETURN: '귀가 시간 위반',
    UNAUTHORIZED_VISIT: '무단 외박',
    FACILITY_DAMAGE: '시설물 파손',
    CLEAN_VIOLATION: '청소 상태 불량',
    OTHER_DEMERIT: '기타 벌점'
  }
} as const; 