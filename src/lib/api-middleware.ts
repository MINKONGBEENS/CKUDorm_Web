import { VercelRequest, VercelResponse } from '@vercel/node';

type ApiHandler = (req: VercelRequest, res: VercelResponse) => Promise<void | VercelResponse>;

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      
      // 응답이 아직 전송되지 않았다면
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: '서버 오류가 발생했습니다.',
          details: error instanceof Error ? error.message : '알 수 없는 오류'
        });
      }
    }
  };
} 