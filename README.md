# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Vercel SPA routing

This project uses Vue Router history mode (`createWebHistory`), so direct reloads on nested routes (for example, `/english`) need a fallback to `index.html`.

The root `vercel.json` includes a filesystem check + catch-all route rewrite to ensure non-file requests are served by the SPA entrypoint.
