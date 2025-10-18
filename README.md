🏪 Product Management System

ระบบจัดการสินค้า (Full-stack Application)
พัฒนาโดยใช้ Node.js (Express) + MongoDB (Mongoose) สำหรับ Back-end
และ Vue.js (Vite + TailwindCSS) สำหรับ Front-end

📋 ฟีเจอร์หลัก
✅ Front-end (Vue 3)

เมนูหลัก 2 รายการ: สินค้า และ หมวดหมู่

ตารางแสดงข้อมูลพร้อม ค้นหา (RegEx), Pagination, และ เลือกจำนวนแถวต่อหน้า (10/25/50)

เพิ่ม / แก้ไข / ลบ ข้อมูลผ่าน Popup Modal

Validate เบื้องต้น:

ชื่อห้ามว่าง

ราคาต้องไม่ติดลบ

สต็อกต้องไม่ติดลบ

ต้องเลือกหมวดหมู่

UI ใช้ TailwindCSS และรองรับ Responsive Design

✅ Back-end (Node.js + Express)

RESTful API แยก Product และ Category

Pagination (page, limit)

ค้นหาแบบ Regular Expression (RegEx)

โครงสร้างแบ่งชั้นชัดเจน:

controllers/

services/

models/

routes/

เชื่อมต่อ MongoDB ผ่าน Mongoose

รองรับ Soft Delete หรือ Hard Delete ตามต้องการ

🧱 โครงสร้างโปรเจกต์
project-root/
│
├─ backend/
│  ├─ package.json
│  └─ src/
│     ├─ server.js
│     ├─ config/
│     │  └─ db.js
│     ├─ models/
│     │  ├─ Product.js
│     │  └─ Category.js
│     ├─ controllers/
│     │  ├─ productController.js
│     │  └─ categoryController.js
│     ├─ services/
│     │  ├─ productService.js
│     │  └─ categoryService.js
│     └─ routes/
│        ├─ productRoutes.js
│        └─ categoryRoutes.js
│
└─ frontend/
   ├─ package.json
   └─ src/
      ├─ main.js
      ├─ router/
      │  └─ index.js
      ├─ api/
      │  └─ index.js
      ├─ layouts/
      │  └─ DashboardLayout.vue
      ├─ pages/
      │  ├─ ProductsPage.vue
      │  └─ CategoriesPage.vue
      └─ components/
         ├─ ProductForm.vue
         └─ CategoryForm.vue

🧾 Schema
Category
{
  name: String,          // required
  description: String,   // optional
}

Product
{
  name: String,          // required
  price: Number,         // required, >= 0
  stock: Number,         // required, >= 0
  description: String,   // optional
  categoryId: ObjectId,  // ref: Category
}

🌐 RESTful API
Category
Method	Endpoint	Description
GET	/categories?page=1&limit=10&search=...	ดึงหมวดหมู่ทั้งหมด (ค้นหา+แบ่งหน้า)
GET	/category/:id	ดึงข้อมูลหมวดหมู่
POST	/category	เพิ่มหมวดหมู่
PUT	/category/:id	แก้ไขหมวดหมู่
DELETE	/category/:id	ลบหมวดหมู่
Product
Method	Endpoint	Description
GET	/products?page=1&limit=10&search=...&categoryId=...	ดึงสินค้าทั้งหมด
GET	/product/:id	ดึงข้อมูลสินค้า
POST	/product	เพิ่มสินค้า
PUT	/product/:id	แก้ไขสินค้า
DELETE	/product/:id	ลบสินค้า
🔍 ตัวอย่างการค้นหา RegEx
GET /products?search=พัดลม


ค้นหาสินค้าที่ชื่อหรือคำอธิบายมีคำว่า “พัดลม”

⚙️ ขั้นตอนการติดตั้ง
1️⃣ ติดตั้ง Back-end
cd backend
npm install
cp .env.example .env   # หรือสร้างไฟล์ .env ด้วยตนเอง
npm run dev             # เริ่มโหมดพัฒนา


ตัวอย่างไฟล์ .env

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/productdb

2️⃣ ติดตั้ง Front-end
cd frontend
npm install
npm run dev


เปิดเบราว์เซอร์ไปที่ http://localhost:5173

🧠 ตัวอย่างการเรียก API
เพิ่มหมวดหมู่
curl -X POST http://localhost:3000/category \
  -H "Content-Type: application/json" \
  -d '{"name": "เครื่องใช้ไฟฟ้า", "description": "อุปกรณ์ไฟฟ้าในบ้าน"}'

เพิ่มสินค้า
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{"name": "พัดลมตั้งโต๊ะ", "price": 799, "stock": 20, "categoryId": "<id>"}'

💅 Frontend Features
ฟีเจอร์	รายละเอียด
🎨 Dashboard Layout	มี Sidebar + Header
📦 ProductsPage.vue	ตาราง, ค้นหา, Popup เพิ่ม/แก้ไข, Pagination
🗂 CategoriesPage.vue	ตาราง, ค้นหา, Popup เพิ่ม/แก้ไข, Pagination
🧾 Forms	Validate ทุกฟิลด์สำคัญ
⚙️ Responsive	รองรับจอเล็ก/มือถือ
🔢 Pagination	ปุ่มก่อนหน้า/ถัดไป + แสดงหน้า X/Y
📊 Limit Selector	เลือกจำนวนแถวต่อหน้า 10 / 25 / 50
🧰 เทคโนโลยีที่ใช้
Layer	Stack
Front-end	Vue 3, Vite, TailwindCSS
State	Pinia
Router	Vue Router 4
Back-end	Node.js, Express.js
Database	MongoDB (Mongoose)
Tools	Axios, dotenv, nodemon