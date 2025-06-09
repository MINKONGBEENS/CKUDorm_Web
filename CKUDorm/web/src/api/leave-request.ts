import { axiosInstance } from './axios';
import { ApiResponse } from '../types/common';

export interface LeaveRequest {
  id: number;
  studentName: string;
  studentId: string;
  room: string;
  startDate: string;
  endDate: string;
  reason: string;
  emergencyContact: string;
  destination: string;
  status: '승인대기' | '승인완료' | '반려';
  createdAt: string;
  duration: string;
}

export const getLeaveRequests = async (): Promise<ApiResponse<LeaveRequest[]>> => {
  const response = await axiosInstance.get<ApiResponse<LeaveRequest[]>>('/leave-requests');
  return response.data;
};

export const updateLeaveRequestStatus = async (id: number, status: '승인완료' | '반려'): Promise<ApiResponse<LeaveRequest>> => {
  const response = await axiosInstance.patch<ApiResponse<LeaveRequest>>(`/leave-requests/${id}`, { status });
  return response.data;
};

export const createLeaveRequest = async (data: Omit<LeaveRequest, 'id' | 'status' | 'createdAt'>) => {
  const response = await axiosInstance.post<LeaveRequest>('/leave-requests', data);
  return response.data;
}; 