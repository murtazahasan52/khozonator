# KH Ozonator Operations Hub

A polished, responsive frontend prototype for a service-and-tender company. It is structured as a Next.js application and is ready to deploy to Vercel after dependencies are installed.

## Included prototype flows

- Role-aware operations overview for Admin/Owner and employees
- Client call pipeline: capture lead, assign owner, prepare quotation, convert to project
- Task assignment with employee routing, completion capture, attachments/notes concept, and WhatsApp notification feedback
- NMC site portfolio with multi-employee assignment and site-wise expenses
- Expense approval/payment workflow concept for Admin and Accountant
- Tender workspace concept: tender upload, vendor inquiries, BOQ import, PDF/Excel generation
- Invoice, payment reminder, reports, and WhatsApp-connected workflow entry points

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel deployment

1. Create a GitHub repository and push this project to it.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Vercel automatically detects Next.js. Keep the default build settings and deploy.

No environment variables are required for this frontend prototype. Before production use, connect a database, authentication, file storage, WhatsApp Business API, email, and a PDF/Excel generation service.
