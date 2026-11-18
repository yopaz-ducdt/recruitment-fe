# Hệ thống tuyển dụng tích hợp AI — Frontend

Frontend cho hệ thống tuyển dụng, tích hợp với backend REST API qua `/api`.

## Yêu cầu

- Node.js phiên bản tương thích với Vite 8
- npm

## Cài đặt và chạy

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Frontend chạy bằng Vite. Các request `/api` được proxy tới `http://localhost:8080` trong môi trường phát triển.

## Lệnh hữu ích

```bash
npm run build  # kiểm tra TypeScript và tạo bản production trong dist/
npm run lint   # chạy ESLint
npm run preview # xem thử bản build production
```

## Cấu hình môi trường

Sao chép `.env.example` thành `.env.local` để cấu hình frontend. Không commit `.env.local` hoặc bất kỳ file môi trường nào chứa giá trị riêng tư. Biến `VITE_*` được đưa vào mã frontend khi build, vì vậy không đặt secret trong đó.

## Mock API

MSW đã được cài để hỗ trợ mock API khi backend chưa sẵn sàng. Chưa có handlers hoặc cơ chế bật/tắt mock trong ứng dụng; bổ sung theo API contract của nhóm trước khi sử dụng.
