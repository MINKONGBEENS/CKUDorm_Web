import React, { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  description?: string;
  submitText?: string;
  isSubmitting?: boolean;
  error?: string;
  className?: string;
}

export const validationRules = {
  username: {
    pattern: /^[a-zA-Z0-9]{4,20}$/,
    message: '4~20자의 영문/숫자만 사용 가능합니다'
  },
  password: {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
    message: '8~20자의 영문/숫자/특수문자를 포함해야 합니다'
  }
} as const;

// TODO: 인증 시스템 구현 시 사용될 세션 인터페이스
/* interface Session {
  token: string;
  expiresIn: number;
  user: {
    id: number;
    username: string;
    role: string;
  };
} */

// TODO: Input 컴포넌트 구현 시 사용될 Props 인터페이스
/* interface InputProps {
  /** 입력 필드 레이블 *//*
  label: string;
  /** 에러 메시지 *//*
  error?: string;
  /** 도움말 텍스트 *//*
  helperText?: string;
  /** 추가 스타일 클래스 *//*
  className?: string;
  /** 입력 필드 타입 *//*
  type: 'text' | 'password' | 'email' | 'number';
  /** 필드 이름 *//*
  name: string;
  /** 필드 값 *//*
  value: string;
  /** 값 변경 핸들러 *//*
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** 필수 입력 여부 *//*
  required?: boolean;
  /** 비활성화 상태 *//*
  disabled?: boolean;
  /** 플레이스홀더 *//*
  placeholder?: string;
} */

// TODO: Input 컴포넌트 구현 시 사용될 스타일 정의
/* const inputStyles = {
  container: 'flex flex-col gap-1',
  label: 'text-sm font-medium text-gray-700',
  input: {
    base: `
      w-full
      px-3
      py-2
      border
      rounded-lg
      focus:ring-2
      focus:ring-[#006272]
      outline-none
      transition-all
    `,
    error: 'border-red-500 focus:ring-red-500',
    disabled: 'bg-gray-100 cursor-not-allowed'
  },
  helper: 'text-xs text-gray-500',
  error: 'text-xs text-red-500'
} as const; */

export const Form: React.FC<FormProps> = ({
  onSubmit,
  title,
  description,
  submitText = '저장',
  isSubmitting = false,
  error,
  className,
  children,
  ...props
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge('space-y-6', className)}
      {...props}
    >
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {children}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={twMerge(
            'inline-flex justify-center rounded-md border border-transparent',
            'bg-[#006272] py-2 px-4 text-sm font-medium text-white shadow-sm',
            'hover:bg-[#005261] focus:outline-none focus:ring-2',
            'focus:ring-[#006272] focus:ring-offset-2',
            isSubmitting && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              처리중...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
}; 