# DDAMatch — Frontend (Hệ Thống Tuyển Dụng Tích Hợp AI)

> Giao diện người dùng cho nền tảng tuyển dụng thông minh **DDAMatch (TalentMatch)**, tích hợp AI phân tích CV, tính điểm tương thích công việc và quản lý quy trình phỏng vấn.

## 📚 Tài liệu dự án

Tài liệu dùng chung cho Frontend, Backend, AI và thiết kế nằm tại [recruitment-docs](https://github.com/yopaz-ducdt/recruitment-docs), gồm [đặc tả API](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/api_specifications.md), [design system](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/ui_ux_design_system.md) và [roadmap](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/project_roadmap_and_decisions.md).

---

## 🚀 Công Nghệ Sử Dụng

| Danh Mục | Công Nghệ & Phiên Bản | Ghi Chú |
| :--- | :--- | :--- |
| **Core Framework** | **React 19** (`^19.3.x`) | Kiến trúc Component hiện đại, React Server Actions / Hooks mới |
| **Language** | **TypeScript** (`~6.0.x`) | Chế độ `strict: true`, nghiêm cấm `any` |
| **Build Tool** | **Vite 8** (`^8.3.x`) | Bundler siêu tốc, HMR, hỗ trợ proxy API `/api` |
| **Styling** | **Tailwind CSS v4** (`^4.3.x`) | Tích hợp qua `@tailwindcss/vite`; design tokens trong `src/index.css` bằng `@theme` |
| **Routing** | **React Router v7** (`^7.18.x`) | Quản lý route đa phân hệ, Route Guard theo quyền (RBAC) |
| **Server State** | **TanStack React Query v5** (`^5.108.x`) | Quản lý cache, polling, optimistic updates (cú pháp object `useQuery`) |
| **HTTP Client** | **Axios** (`^1.21.x`) | Instance tập trung với interceptor tự động refresh token khi gặp `401` |
| **API Mocking** | **MSW v3** (`^3.0.x`) | Mock Service Worker hỗ trợ giả lập API độc lập với Backend |
| **Linting & Code Quality** | **ESLint 10** + **typescript-eslint 8** | Flat Config (`eslint.config.js`), kiểm soát tiêu chuẩn code nghiêm ngặt |

---

## 📐 Kiến Trúc Giao Diện & Design System (Stitch)

Giao diện được thiết kế theo hệ thống **Intelligent Precision Talent Architecture** (xem chi tiết tại [UI/UX design system](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/ui_ux_design_system.md)):

- **Kiểu chữ (Typography)**: Phông nền chuẩn `Inter` (`line-height >= 1.4`). Bắt buộc dùng `tabular-nums` cho số liệu, mức lương, phần trăm và điểm AI Matching.
- **Bảng màu chủ đạo (Color Palette)**:
  - **Primary (Royal Tech Blue)**: `#1D4ED8` — Nút hành động chính, active menu, verified badge.
  - **Secondary / AI Core (Deep Teal)**: `#0D9488` — Điểm nhấn AI, radar chart, nhãn kỹ năng tương thích.
  - **Tertiary (Cyan Accent)**: `#06B6D4` — Dải màu gradient AI, tiến trình xử lý.
  - **Surface Canvas**: `#FAF8FF` — Nền trang ứng dụng.
  - **Surface Container Lowest**: `#FFFFFF` — Nền thẻ card, bảng biểu, modal.
  - **Status**: Success `#10B981` (điểm tương thích $\ge 85\%$), Warning `#F59E0B`, Error `#EF4444`.
- **Bo góc (Corner Radii)**: Dùng utility Tailwind v4 có scale tường minh. Với scale mặc định, dùng `rounded-lg` (8px) cho button/input, `rounded-2xl` (16px) cho card, `rounded-3xl` (24px) cho hero/modal và `rounded-full` cho badge/avatar.

## 📦 Quy Ước Import

- Dùng alias `@/` cho import giữa các thư mục trong `src/`, ví dụ `@/components/ui/Card` hoặc `@/hooks/useAuth`.
- Giữ import tương đối `./` cho module cùng thư mục hoặc file lân cận, ví dụ `./LoadingSpinner`.
- Alias `@/` ánh xạ tới `src/` và được cấu hình trong `tsconfig.app.json` cùng `vite.config.ts`; hai mapping phải luôn đồng bộ.
- Dùng utility Tailwind v4 hiện hành như `bg-linear-to-r`, `shadow-xs`, `backdrop-blur-xs`, `outline-hidden` và opacity modifier (`bg-primary/10`).

---

## 📂 Cấu Trúc Thư Mục Dự Án (`src/`)

```text
src/
├── assets/                 # Hình ảnh tĩnh, SVG icons, logo thương hiệu
├── components/             # Reusable React components
│   ├── ui/                 # Atomic UI primitives: Button, Input, Modal, Badge, Table, Card, Toast...
│   └── common/             # Composite elements: Navbar, Sidebar, Footer, ProtectedRoute, Spinner...
├── layouts/                # 4 Layout khung sườn chính của hệ thống:
│   ├── AuthLayout.tsx              # Đăng nhập, đăng ký, quên mật khẩu
│   ├── CandidateLayout.tsx         # Workspace ứng viên (Tìm việc, Quản lý CV, Ứng tuyển)
│   ├── RecruiterLayout.tsx         # Workspace nhà tuyển dụng (Đăng tin, Pipeline ứng viên)
│   └── AdminLayout.tsx             # Dashboard quản trị viên (Duyệt công ty, Duyệt tin, Quản lý user)
├── pages/                  # Màn hình theo phân hệ nghiệp vụ:
│   ├── auth/               # Login, RegisterCandidate, RegisterRecruiter, VerifyEmail, ForgotPassword
│   ├── candidate/          # JobList, JobDetail, ApplyJob, MyResumes, AIAnalysis, MatchReport...
│   ├── recruiter/          # Dashboard, JobManage, CreateJob, Applicants, ScheduleInterview, CompanyProfile...
│   └── admin/              # Dashboard, CompanyApproval, JobApproval, UserManage...
├── services/               # Tầng giao tiếp Backend REST API:
│   ├── apiClient.ts        # Axios client chuẩn hóa: gắn Bearer token, interceptor tự động refresh token 401
│   ├── authApi.ts          # API đăng ký, đăng nhập, refresh token, gửi mail xác thực
│   ├── companyApi.ts       # API thông tin công ty và hồ sơ pháp lý
│   ├── jobApi.ts           # API danh sách việc làm, bộ lọc, chi tiết việc làm
│   ├── resumeApi.ts        # API upload CV (PDF), trích xuất thông tin AI
│   └── applicationApi.ts   # API ứng tuyển, trạng thái tuyển dụng, đặt lịch phỏng vấn
├── hooks/                  # Custom React hooks (useAuth, useDebounce, useJobFilters, useToast...)
├── types/                  # Định nghĩa TypeScript: DTOs, Enums, API Envelopes, Domain models
├── context/                # Global contexts (AuthContext, ThemeContext, NotificationContext)
├── router/                 # Cấu hình routes React Router v7 & Role-based Access Guards
├── index.css               # Import Tailwind CSS v4 và định nghĩa token biến theme
└── main.tsx                # Điểm khởi chạy ứng dụng React
```

---

## 🛠️ Yêu Cầu & Cài Đặt Môi Trường

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản `>= 20.18.0` (tương thích Vite 8)
- **npm**: Phiên bản `>= 10.0.0`
- **Backend API**: Đang chạy tại `http://localhost:8080` (hoặc cấu hình thông qua biến môi trường)

### 2. Cài đặt các gói phụ thuộc

```bash
npm ci
```

### 3. Cấu hình biến môi trường

Sao chép file `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

Nội dung cấu hình trong `.env.local`:

```env
# Backend API Base URL (được Vite proxy qua /api khi dev)
VITE_API_BASE_URL=/api

# Cờ bật tắt mock API với MSW (true / false)
VITE_ENABLE_MOCK_API=false
```

> **Lưu ý bảo mật**: Không bao giờ commit file `.env.local` hoặc các file chứa thông tin nhạy cảm vào Git repository. Toàn bộ biến có tiền tố `VITE_*` sẽ bị đóng gói công khai vào bundle frontend.

---

## 💻 Các Lệnh Thực Thi (Scripts)

| Lệnh | Mục Đích |
| :--- | :--- |
| `npm run dev` | Khởi động máy chủ phát triển Vite với Hot Module Replacement (HMR) |
| `npm run build` | Kiểm tra toàn bộ kiểu TypeScript (`tsc -b`) và biên dịch production ra thư mục `dist/` |
| `npm run lint` | Chạy kiểm tra tĩnh mã nguồn bằng ESLint (Flat Config) |
| `npm run preview` | Khởi chạy máy chủ cục bộ để xem trước bản build production trong `dist/` |

---

## 🔄 Luồng Tích Hợp API & Xác Thực (Authentication Flow)

1. **Proxy môi trường Dev**:
   - File `vite.config.ts` cấu hình chuyển tiếp toàn bộ request bắt đầu bằng `/api` sang máy chủ Backend `http://localhost:8080`.
2. **Quản lý Token**:
   - Khi đăng nhập thành công (`POST /api/auth/login`), nhận về cặp `accessToken` (thời hạn 15 phút) và `refreshToken` (thời hạn 7 ngày).
   - `apiClient.ts` tự động gắn `Authorization: Bearer <accessToken>` vào header của mọi request.
3. **Cơ chế Auto Token Refresh**:
   - Khi nhận phản hồi HTTP `401 Unauthorized`, response interceptor tự động kích hoạt `POST /api/auth/refresh` bằng `refreshToken`.
   - Sau khi nhận `accessToken` mới, hệ thống tự động gửi lại request ban đầu bị lỗi mà không làm gián đoạn trải nghiệm người dùng.
   - Nếu refresh thất bại (hết hạn hoàn toàn), xóa session và điều hướng về `/login`.
4. **Phạm vi Đăng ký Tài khoản (Giai đoạn 1)**:
   - Payload đăng ký chỉ bao gồm `{ email, password, role }` (`CANDIDATE` hoặc `RECRUITER`).
   - Thông tin hồ sơ chi tiết (họ tên, công ty, bằng cấp) được cập nhật ở luồng onboarding sau khi đăng nhập.

---

## 🤖 Quy Chuẩn Đa Tác Nhân AI & Nhà Phát Triển (Agent Rules)

Dự án áp dụng quy chuẩn phát triển nghiêm ngặt hỗ trợ cả lập trình viên và các AI Coding Agents:

- **Ngôn ngữ bắt buộc**: **Tiếng Anh 100%** cho mã nguồn, tên biến/hàm, chú thích code (inline comments, JSDoc), commit messages và tài liệu kỹ thuật trong repo.
- **Quy trình Git & Tạo PR**: **Tuyệt đối không commit trực tiếp vào nhánh `main`**. Mọi tính năng, sửa lỗi hay tái cấu trúc đều phải tạo nhánh riêng (`feat/<tên>`, `fix/<tên>`, `chore/<tên>`) và tạo **Pull Request (PR)** để review trước khi merge vào `main`.
- **Quy chuẩn Git Commit**: Tuân thủ chuẩn **Conventional Commits** bằng tiếng Anh:
  - `feat(scope): ...`
  - `fix(scope): ...`
  - `ui(scope): ...`
  - `refactor(scope): ...`
  - `chore(scope): ...`
- **Bộ tài liệu quy tắc cho các AI Agents**:
  - [`AGENTS.md`](file:///home/ducdt/Other/recruitment-fe/AGENTS.md): Quy chuẩn trung tâm bắt buộc cho mọi AI Agent.
  - [`CLAUDE.md`](file:///home/ducdt/Other/recruitment-fe/CLAUDE.md): Chỉ dẫn dành riêng cho Claude Code.
  - [`CODEX.md`](file:///home/ducdt/Other/recruitment-fe/CODEX.md): Chỉ dẫn dành riêng cho OpenAI Codex CLI.
  - [`.cursorrules`](file:///home/ducdt/Other/recruitment-fe/.cursorrules): Cấu hình ngữ cảnh cho Cursor IDE.
  - [`.github/copilot-instructions.md`](file:///home/ducdt/Other/recruitment-fe/.github/copilot-instructions.md): Hướng dẫn cho GitHub Copilot.
  - [`.gemini/rules/fe-agents-rules.md`](file:///home/ducdt/Other/recruitment-fe/.gemini/rules/fe-agents-rules.md): Hướng dẫn cho Google Antigravity / Gemini.

---

## 📚 Tài Liệu Kỹ Thuật Liên Quan

- 📘 [Hướng dẫn triển khai Frontend chi tiết (`docs/FRONTEND_DEVELOPMENT_GUIDE.md`)](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/FRONTEND_DEVELOPMENT_GUIDE.md)
- 🔌 [Đặc tả API Backend toàn diện (`docs/api_specifications.md`)](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/api_specifications.md)
- 🎨 [Đặc tả Hệ thống Thiết kế UI/UX Stitch (`docs/ui_ux_design_system.md`)](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/ui_ux_design_system.md)
- 🗄️ [Từ điển Dữ liệu Cơ sở Dữ liệu (`docs/database_schema.md`)](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/database_schema.md)
- 🗺️ [Lộ trình Dự án & Các Quyết định Kỹ thuật (`docs/project_roadmap_and_decisions.md`)](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/project_roadmap_and_decisions.md)
- 🌐 [Kho Tri thức Dự án Toàn Diện (`docs/README.md`)](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/README.md)
