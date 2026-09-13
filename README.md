# MRT TOOLS Digital Products

Private repository for the MRT TOOLS digital product access platform.

## Current stage

- Responsive storefront UI with dark/light theme
- Login foundation with Auth.js
- Google OAuth provider configuration
- Credentials provider foundation
- Protected dashboard route
- PostgreSQL + Prisma data model for users, products and entitlements
- Product/order entitlement model prepared for the next stage
- Vercel deployment intentionally deferred until testing and review are complete

## Architecture

Next.js App Router + JavaScript, Auth.js for authentication, Prisma + PostgreSQL for persistent data, and server-side entitlement checks before protected product content is exposed.

## Environment

Copy `.env.example` to `.env` and provide the real database and OAuth values locally. Never commit production secrets.
