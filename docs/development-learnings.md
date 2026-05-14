# Development learnings & Best Practices

This document tracks important architectural decisions, lessons learned, and "faults" to avoid during the development of the Student Information Management System.

## API & Filtering

### 1. Synchronized Filtering (Fetch vs. Export)
**Lesson**: When moving filtering or pagination from client-side to server-side (API-based), always ensure that **all** related features are updated to use the same parameters.
- **Problem**: Updating `fetchData` to use API filters but leaving `handleExport` with old or incomplete parameter logic results in exported files that do not match the UI view.
- **Fix**: Both `fetchData` and `handleExport` should share the same `appliedFilters` state to ensure consistency across the application.

## UI/UX alignment

### 2. Backend Schema awareness
- Always verify the backend `Joi` validation schemas before implementing client-side workarounds. 
- Avoid outdated assumptions (e.g., assuming backend only supports FY/SY/TY when it actually supports SE/TE/BE).

## File Handling

### 3. Size Limits
- Always align frontend file size validation with backend `MAX_FILE_SIZE` constants to avoid "silent" failures or misleading error messages.
