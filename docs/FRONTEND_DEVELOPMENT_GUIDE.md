# Kế Hoạch Triển Khai Frontend (Frontend Development Guide)

Tài liệu này dành cho thành viên phụ trách **Frontend (`recruitment-fe`)** để hiểu rõ lộ trình phát triển, cấu trúc mã nguồn, ánh xạ màn hình giao diện (Stitch UI) và cách tích hợp với Backend API.

---

## 1. Tổng Quan Công Nghệ & Khung Ứng Dụng

- **Framework**: React 19 + TypeScript + Vite 8.
- **Styling**: Tailwind CSS v4 bám sát Design System *Intelligent Precision Talent Architecture* trên Stitch (Font: `Inter`, Màu chủ đạo: `#1D4ED8`, AI Teal: `#0D9488`).
- **Routing**: `react-router-dom` v7 — phân chia 4 Layout:
  1. `AuthLayout`: Dành cho các trang đăng nhập, đăng ký, quên/đặt lại mật khẩu.
  2. `CandidateLayout`: Header tìm việc, menu ứng viên, thông báo, avatar.
  3. `RecruiterLayout`: Sidebar quản trị tin tuyển dụng, ứng viên, công ty.
  4. `AdminLayout`: Sidebar quản trị hệ thống, duyệt doanh nghiệp, duyệt tin.
- **Data Fetching & Cache**: `@tanstack/react-query` v5.
- **HTTP Client**: `axios` kết hợp cấu hình Interceptor gắn Bearer Token và tự động refresh token khi gặp 401.
- **Proxy Dev**: Đã cấu hình trong `vite.config.ts` để proxy toàn bộ `/api` sang `http://localhost:8080`.

---

## 2. Cấu Trúc Thư Mục Đề Xuất Cho `recruitment-fe/src/`

```text
src/
├── assets/             # Logo, icons, hình ảnh tĩnh
├── components/         # Các thành phần dùng chung (Button, Input, Modal, Badge, Table, Card...)
│   ├── ui/             # Atomic UI components
│   └── common/         # Navbar, Sidebar, Footer, ProtectedRoute
├── layouts/            # AuthLayout, CandidateLayout, RecruiterLayout, AdminLayout
├── pages/              # Màn hình theo phân hệ
│   ├── auth/           # Login, RegisterCandidate, RegisterRecruiter, ForgotPassword, ResetPassword
│   ├── candidate/      # JobList, JobDetail, ApplyJob, MyResumes, AIAnalysis, SavedJobs...
│   ├── recruiter/      # Dashboard, JobManage, CreateJob, Applicants, ScheduleInterview...
│   └── admin/          # Dashboard, CompanyApproval, JobApproval, UserManage...
├── services/           # Gọi API qua axios (authApi, jobApi, resumeApi, recruiterApi...)
├── hooks/              # Custom hooks (useAuth, useDebounce, useJobFilters...)
├── types/              # TypeScript definitions (User, Job, Resume, Application, ApiError...)
├── context/            # AuthContext (lưu giữ user profile, trạng thái login)
├── router/             # Cấu hình routes và route guards
└── main.tsx
```

---

## 3. Kế Hoạch Triển Khai Theo Từng Giai Đoạn

> **Nguyên tắc cốt lõi về Dữ liệu & Giao diện:**  
> Bản thiết kế UI trên Stitch là bản phác thảo định hướng phong cách (style, layout, visual hierarchy). Mọi trường nhập liệu (form fields) và payload request của Frontend **phải chuẩn hóa 100% theo đúng API DTO của Backend (`recruitment-be`)**.  
> - **Form Đăng ký**: Chỉ bao gồm các trường mà BE yêu cầu: `email`, `password`, `role` (`CANDIDATE` hoặc `RECRUITER`).  
> - **Thông tin hồ sơ chi tiết**: Các trường như Họ và tên, Số điện thoại, Thông tin công ty sẽ được hoàn thiện ở các bước Onboarding / Thiết lập hồ sơ ở Giai đoạn 2 và 3 sau khi người dùng đăng nhập.

### 🚀 BƯỚC 1: Triển Khai Ngay Giai Đoạn 1 (Xác Thực & Tài Khoản)
Backend đã hoàn thành 100% API cho giai đoạn này. Frontend chuẩn hóa form theo DTO backend:

| Màn hình Stitch | Tên trang / URL đề xuất | API Backend tích hợp | Ghi chú chuẩn hóa form |
| :--- | :--- | :--- | :--- |
| `ae54689e53f24ca390166e3949c6af96` | **Đăng nhập** (`/login`) | `POST /api/auth/login` | Form: `{ email, password }`. Lưu token và chuyển trang theo role |
| `6dc2f8400acd41d884e72ad57d37885d` | **Đăng ký Ứng viên** (`/register`) | `POST /api/auth/register` | Form: `{ email, password, role: 'CANDIDATE' }`. Chuyển sang màn hình chờ xác thực email |
| `792fb8bcb8aa42f2a74339287b50f659` | **Đăng ký Nhà tuyển dụng** (`/register-recruiter`) | `POST /api/auth/register` | Form: `{ email, password, role: 'RECRUITER' }`. Chuyển sang màn hình chờ xác thực email |
| `f2068d04b6e84fe68f3dce3017ee2730` | **Quên mật khẩu** (`/forgot-password`) | `POST /api/auth/forgot-password` | Form: `{ email }`. Thông báo kiểm tra hòm thư |
| `9198d47257864f75b3ebd43b2e0c4490` | **Đặt lại mật khẩu** (`/reset-password`) | `POST /api/auth/reset-password` | Form: `{ token, newPassword }`. Đọc token từ query param `?token=` |
| *(Màn hình thông báo)* | **Xác thực Email** (`/verify-email`) | `POST /api/auth/verify-email` | Tự động gọi API với `?token=` khi nhấp link trong mail |

---

### 📦 BƯỚC 2: Các Giai Đoạn Tiếp Theo (Bám sát Kế Hoạch Google Sheet & Stitch)

| Giai đoạn | Tính năng chính | Màn hình Stitch tham chiếu (Screen ID) |
| :--- | :--- | :--- |
| **GĐ 2: Dữ liệu nền** | Đăng ký thông tin công ty, duyệt doanh nghiệp, hồ sơ NTD | `173da20fe4404f5fab128cf82b6c58dc` (Hồ sơ công ty)<br>`9704cd1cf38a41b688f8f6d6f02c818d` (Kiểm duyệt công ty) |
| **GĐ 3: Hồ sơ ứng viên** | Hồ sơ cá nhân, kỳ vọng nghề nghiệp (lương, địa điểm, chế độ) | `ff89a904cba746cd987c349692db8b9c` (Hồ sơ & Kỳ vọng) |
| **GĐ 4: Quản lý CV** | Danh sách CV, tải lên CV mới (PDF/DOCX), đặt mặc định | `32a4aa846ced45faa74165f15f7a283d` (Quản lý CV của tôi) |
| **GĐ 5: AI xử lý CV** | Xem kết quả bóc tách học vấn, kinh nghiệm, kỹ năng từ CV | `967e123520c547ac99acca9405850850` (Kết quả bóc tách CV) |
| **GĐ 6: Tin tuyển dụng** | Tìm kiếm, lọc việc làm, chi tiết công việc, đăng tin mới | `59705e50b7de4b7bb7ac8c11597196d1` (Tìm việc làm)<br>`76aa0e49a3ac4968bbe68415d3a29b05` (Chi tiết việc)<br>`96a76be32bc94505b55e7e5a746d3756` (Tạo/Sửa tin) |
| **GĐ 7: Matching & Gợi ý AI** | Việc làm AI gợi ý, Báo cáo đối sánh năng lực (Radar Chart) | `583ac42ff19049ca8438b182d3c38d33` (Việc làm gợi ý)<br>`debdafc3060241d4b4f141fd8c277bbc` (Báo cáo Đối sánh) |
| **GĐ 8: Ứng tuyển & Phỏng vấn**| Nộp hồ sơ, danh sách đơn, xem ứng viên nộp, lịch phỏng vấn | `7fead2a68a0a42a9af68fd7bad340bd1` (Form nộp đơn)<br>`79b8d9784a3d47e6b24a40e76012fa0f` (Quản lý đơn)<br>`22712612ea614d34a155ae903057e016` (Lịch phỏng vấn) |
| **GĐ 9: Tương tác** | Việc làm đã lưu, công ty theo dõi, trung tâm thông báo | `3e9ee61fc8964f558dd2081d6997027c` (Việc đã lưu)<br>`86a91ea037304147b9000d7d31fbe35a` (Thông báo) |
| **GĐ 10: Quản trị** | Tổng quan admin, duyệt tin, quản lý tài khoản người dùng | `bddc4f0b3e934e67b90f3a907a9fb27f` (Admin Dashboard)<br>`6cd2c4eeb18f4c80918c03c9621e7d7d` (Duyệt tin)<br>`4685e5166bc34e0c8eba7d86dd9817f3` (Quản lý users) |

---

## 4. Hướng Dẫn Tích Hợp Axios & Auth Token

Cần tạo instance axios chung tại `src/services/apiClient.ts` để:
1. Tự động đính kèm `Authorization: Bearer <accessToken>`.
2. Khi gặp lỗi `401 Unauthorized`: Tự động gọi `POST /api/auth/refresh` bằng `refreshToken` lưu trong localStorage/cookie để lấy token mới, sau đó retry lại request gốc.
3. Khi refresh thất bại: Xóa session và chuyển hướng về trang `/login`.
