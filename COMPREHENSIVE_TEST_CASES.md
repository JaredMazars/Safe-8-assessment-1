# 🧪 SAFE-8 COMPREHENSIVE PRODUCTION READINESS TEST PLAN

**Project:** SAFE-8 AI Readiness Assessment Platform  
**Version:** 1.0.0  
**Test Date:** January 27, 2026  
**Tester:** _________________  
**Environment:** Development/Staging/Production

---

## 📋 TEST EXECUTION SUMMARY

| Section | Total Tests | Passed | Failed | Skipped | Status |
|---------|-------------|--------|--------|---------|--------|
| 1. Admin Portal | 120+ | __ | __ | __ | ⬜ |
| 2. User Portal | 80+ | __ | __ | __ | ⬜ |
| 3. Public Features | 40+ | __ | __ | __ | ⬜ |
| 4. API Endpoints | 60+ | __ | __ | __ | ⬜ |
| 5. Database & Data | 30+ | __ | __ | __ | ⬜ |
| 6. Security | 25+ | __ | __ | __ | ⬜ |
| 7. Email System | 15+ | __ | __ | __ | ⬜ |
| 8. Performance | 10+ | __ | __ | __ | ⬜ |
| 9. UI/UX | 20+ | __ | __ | __ | ⬜ |
| 10. Integration E2E | 15+ | __ | __ | __ | ⬜ |
| **TOTAL** | **415+** | **__** | **__** | **__** | **⬜** |

**Legend:**
- ✅ = Passed
- ❌ = Failed
- ⚠️ = Blocked/Skipped
- ⬜ = Not Started

---

## 🎯 SECTION 1: ADMIN PORTAL TESTING

### 1.1 ADMIN AUTHENTICATION & SESSION

#### Test 1.1.1: Admin Login - Frontend & Backend
**URL:** `http://localhost:5173/admin/login`  
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Navigate to `/admin/login` | Page loads with Forvis Mazars logo, login form visible | ⬜ | ⬜ | |
| 2 | Check form fields | Username input, password input, login button present | ⬜ | ⬜ | |
| 3 | Leave username empty, click submit | Validation error: "Username required" | ⬜ | ⬜ | |
| 4 | Leave password empty, click submit | Validation error: "Password required" | ⬜ | ⬜ | |
| 5 | Enter invalid username: `wronguser` | Error: "Invalid credentials" | ⬜ | ⬜ | |
| 6 | Enter wrong password: `wrongpass` | Error: "Invalid credentials" | ⬜ | ⬜ | |
| 7 | Enter valid credentials: `admin` / `Admin123!` | Redirect to `/admin/dashboard` | ⬜ | ⬜ | |
| 8 | Check localStorage after login | `adminToken` exists and is not empty | ⬜ | ⬜ | |
| 9 | Check localStorage after login | `adminUser` contains admin data (username, role, etc.) | ⬜ | ⬜ | |
| 10 | **Backend:** Check server console logs | "✅ Admin logged in: admin" appears | ⬜ | ⬜ | |
| 11 | **Backend:** Query database | Activity log entry created in `user_activities` or `admin_activities` | ⬜ | ⬜ | |
| 12 | **Backend:** Check session token | Token stored in database with expiry time | ⬜ | ⬜ | |

**Test Data:**
```
Valid Admin: admin / Admin123!
Invalid: wronguser / wrongpass
```

**SQL Verification:**
```sql
-- Check activity log
SELECT * FROM user_activities 
WHERE action_type = 'LOGIN' 
ORDER BY created_at DESC 
LIMIT 1;

-- Check admin sessions (if table exists)
SELECT * FROM admin_sessions 
WHERE admin_id = (SELECT id FROM admins WHERE username = 'admin')
ORDER BY created_at DESC;
```

---

#### Test 1.1.2: Admin Logout - Frontend & Backend
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Login as admin first | Dashboard visible | ⬜ | ⬜ | |
| 2 | Click logout button (top right) | Confirmation dialog appears | ⬜ | ⬜ | |
| 3 | Check confirmation message | "Are you sure you want to logout?" | ⬜ | ⬜ | |
| 4 | Click "Cancel" | Dialog closes, stays on dashboard | ⬜ | ⬜ | |
| 5 | Click logout again, confirm | Redirect to `/admin/login` | ⬜ | ⬜ | |
| 6 | Check localStorage | `adminToken` removed | ⬜ | ⬜ | |
| 7 | Check localStorage | `adminUser` removed | ⬜ | ⬜ | |
| 8 | Try accessing `/admin/dashboard` directly | Redirect to login page | ⬜ | ⬜ | |
| 9 | **Backend:** Check server logs | "✅ Admin logged out: admin" | ⬜ | ⬜ | |
| 10 | **Backend:** Check database | Session invalidated/deleted | ⬜ | ⬜ | |

---

#### Test 1.1.3: Session Persistence & Token Validation
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Login as admin | Dashboard loads | ⬜ | ⬜ | |
| 2 | Refresh page (F5) | Still logged in, no redirect | ⬜ | ⬜ | |
| 3 | Close browser tab completely | - | ⬜ | ⬜ | |
| 4 | Reopen browser, go to `/admin/dashboard` | Still logged in (token persists) | ⬜ | ⬜ | |
| 5 | Open DevTools, Application tab | Check `adminToken` and `adminUser` in localStorage | ⬜ | ⬜ | |
| 6 | Manually delete `adminToken` from localStorage | - | ⬜ | ⬜ | |
| 7 | Click any tab or reload | Redirect to login page | ⬜ | ⬜ | |
| 8 | **Backend:** Set token to expired (if testing expiry) | API returns 401 Unauthorized | ⬜ | ⬜ | |
| 9 | **Backend:** Use invalid/malformed token | API returns 401 Unauthorized | ⬜ | ⬜ | |

---

#### Test 1.1.4: Protected Routes Security
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Test Case | Expected Result | ✓ | ✗ | Notes |
|---|-----------|----------------|---|---|-------|
| 1 | Access `/admin/dashboard` without any token | Redirect to `/admin/login` | ⬜ | ⬜ | |
| 2 | Access `/admin/dashboard` with expired token | Redirect to `/admin/login` | ⬜ | ⬜ | |
| 3 | Access `/admin/dashboard` with invalid token | Redirect to `/admin/login` | ⬜ | ⬜ | |
| 4 | Access `/admin/dashboard` with valid token | Page loads successfully | ⬜ | ⬜ | |
| 5 | **Backend:** Call `GET /api/admin/stats` without token | 401 Unauthorized response | ⬜ | ⬜ | |
| 6 | **Backend:** Call `GET /api/admin/users` without token | 401 Unauthorized response | ⬜ | ⬜ | |
| 7 | **Backend:** Call admin API with user token (if different) | 403 Forbidden response | ⬜ | ⬜ | |

---

### 1.2 DASHBOARD TAB - STATISTICS

#### Test 1.2.1: Stats Cards Display
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| Element | Expected Display | ✓ | ✗ | Actual Value | Notes |
|---------|-----------------|---|---|--------------|-------|
| Total Users card | Shows count + `fa-users` icon + primary blue color | ⬜ | ⬜ | __ | |
| Total Assessments card | Shows count + `fa-clipboard-check` icon + secondary color | ⬜ | ⬜ | __ | |
| Total Questions card | Shows count + `fa-question-circle` icon + accent color | ⬜ | ⬜ | __ | |
| Active Admins card | Shows count + `fa-user-shield` icon + color | ⬜ | ⬜ | __ | |
| Loading state | Spinner/skeleton shows while fetching data | ⬜ | ⬜ | | |
| Error state | Error message if API fails + retry button | ⬜ | ⬜ | | |
| Responsive layout | Cards stack properly on mobile (<768px) | ⬜ | ⬜ | | |

**Backend Verification:**
| # | Test | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Call `GET /api/admin/dashboard/stats` | Returns JSON: `{success: true, stats: {...}}` | ⬜ | ⬜ | |
| 2 | Check total_users value | Matches `SELECT COUNT(*) FROM leads` | ⬜ | ⬜ | |
| 3 | Check total_assessments value | Matches `SELECT COUNT(*) FROM assessments` | ⬜ | ⬜ | |
| 4 | Check total_questions value | Matches `SELECT COUNT(*) FROM assessment_questions WHERE is_active=1` | ⬜ | ⬜ | |
| 5 | Response time | < 1 second | ⬜ | ⬜ | |

**SQL Verification:**
```sql
-- Verify counts manually
SELECT 
  (SELECT COUNT(*) FROM leads) as total_users,
  (SELECT COUNT(*) FROM assessments) as total_assessments,
  (SELECT COUNT(*) FROM assessment_questions WHERE is_active = 1) as total_questions,
  (SELECT COUNT(*) FROM admins WHERE is_active = 1) as active_admins;
```

---

#### Test 1.2.2: Assessment Breakdown by Type
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| Element | Expected Display | ✓ | ✗ | Notes |
|---------|-----------------|---|---|-------|
| Section heading | "Assessments by Type" visible | ⬜ | ⬜ | |
| CORE badge | Shows count + average score (e.g., "12 assessments • Avg: 78%") | ⬜ | ⬜ | |
| ADVANCED badge | Shows count + average score | ⬜ | ⬜ | |
| FRONTIER badge | Shows count + average score | ⬜ | ⬜ | |
| TEST badge | Shows count + average score | ⬜ | ⬜ | |
| Custom types (TEST3, EXPERT) | Shows if exist in database | ⬜ | ⬜ | |
| Badge colors | CORE=green, ADVANCED=blue, FRONTIER=purple, TEST=orange | ⬜ | ⬜ | |
| Empty state | "No assessments yet" if no data | ⬜ | ⬜ | |

**Backend Verification:**
```sql
-- Verify assessment breakdown
SELECT 
  assessment_type,
  COUNT(*) as count,
  AVG(overall_score) as avg_score
FROM assessments
GROUP BY assessment_type
ORDER BY assessment_type;
```

---

#### Test 1.2.3: Recent Activity Feed
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| Element | Expected Display | ✓ | ✗ | Notes |
|---------|-----------------|---|---|-------|
| Section heading | "Recent Activity" visible | ⬜ | ⬜ | |
| Activity items | Shows last 10 activities | ⬜ | ⬜ | |
| Activity icons | CREATE=`fa-plus`, UPDATE=`fa-edit`, DELETE=`fa-trash`, VIEW=`fa-eye` | ⬜ | ⬜ | |
| Activity description | Clear text (e.g., "Created user: john@example.com") | ⬜ | ⬜ | |
| Activity timestamp | Formatted date/time (e.g., "Jan 27, 2026 2:30 PM") | ⬜ | ⬜ | |
| Admin username | Shows who performed the action | ⬜ | ⬜ | |
| Empty state | "No recent activity" message if none | ⬜ | ⬜ | |
| Auto-refresh | New activities appear without page refresh (if implemented) | ⬜ | ⬜ | |

---

### 1.3 USERS TAB - COMPLETE CRUD

#### Test 1.3.1: Users List Display
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Users" tab | Tab activates (highlighted), loads users list | ⬜ | ⬜ | |
| 2 | Check "Create User" button | Visible at top right, blue background, `fa-plus` icon | ⬜ | ⬜ | |
| 3 | Check search input | Visible, placeholder: "Search users by name, email, or company..." | ⬜ | ⬜ | |
| 4 | Check table headers | Name, Email, Company, Industry, Assessments, Actions | ⬜ | ⬜ | |
| 5 | Check table rows | Populated with user data | ⬜ | ⬜ | |
| 6 | Check loading spinner | Shows while fetching (spinner icon + text) | ⬜ | ⬜ | |
| 7 | Check pagination controls | Visible if more than 20 users | ⬜ | ⬜ | |
| 8 | Check "No users found" state | Shows if database is empty | ⬜ | ⬜ | |
| 9 | **Backend:** Check API call | `GET /api/admin/users?page=1&limit=20` | ⬜ | ⬜ | |
| 10 | **Backend:** Check response structure | `{success: true, users: [...], pagination: {...}}` | ⬜ | ⬜ | |

---

#### Test 1.3.2: User Search Functionality
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Type "John" in search box | Search input updates in real-time | ⬜ | ⬜ | |
| 2 | Press Enter or wait 500ms | Table filters to show users with "John" in name | ⬜ | ⬜ | |
| 3 | Search by email: "test@" | Filters to emails containing "test@" | ⬜ | ⬜ | |
| 4 | Search by company: "Tech" | Filters to companies containing "Tech" | ⬜ | ⬜ | |
| 5 | Search: "zzzzz" (no results) | Shows "No users found" message | ⬜ | ⬜ | |
| 6 | Clear search box | Shows all users again | ⬜ | ⬜ | |
| 7 | Search with special chars: "O'Brien" | Handles apostrophes correctly (no SQL injection) | ⬜ | ⬜ | |
| 8 | **Backend:** Check API call | `GET /api/admin/users?search=John` | ⬜ | ⬜ | |
| 9 | **Backend:** Verify SQL query | Uses parameterized queries (no SQL injection) | ⬜ | ⬜ | |

**Test Searches:**
- "John"
- "test@"
- "Tech"
- "O'Brien"
- "zzzzz"

---

#### Test 1.3.3: Create New User - Complete Flow
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Create User" button | Modal opens with empty form | ⬜ | ⬜ | |
| 2 | Check modal title | "Create New User" | ⬜ | ⬜ | |
| 3 | Check all form fields present | Name, Email, Company, Industry (dropdown), Job Title, Phone, Password | ⬜ | ⬜ | |
| 4 | Leave name empty, click submit | Validation error: "Name is required" | ⬜ | ⬜ | |
| 5 | Enter name, leave email empty | Validation error: "Email is required" | ⬜ | ⬜ | |
| 6 | Enter invalid email: "notanemail" | Validation error: "Invalid email format" | ⬜ | ⬜ | |
| 7 | Enter existing email | Validation error: "Email already exists" | ⬜ | ⬜ | |
| 8 | Leave password empty | Validation error: "Password is required" | ⬜ | ⬜ | |
| 9 | Enter weak password: "123" | Validation error: "Password must be at least 8 characters" | ⬜ | ⬜ | |
| 10 | Enter valid password: "SecurePass123!" | No error | ⬜ | ⬜ | |
| 11 | Fill all required fields with valid data | No validation errors | ⬜ | ⬜ | |
| 12 | Click "Create User" button | Loading spinner appears on button | ⬜ | ⬜ | |
| 13 | Wait for response | Success message appears | ⬜ | ⬜ | |
| 14 | Check modal closes automatically | Modal disappears after 1-2 seconds | ⬜ | ⬜ | |
| 15 | Check users table refreshes | New user visible in table | ⬜ | ⬜ | |
| 16 | **Backend:** Check API call | `POST /api/admin/users` with user data | ⬜ | ⬜ | |
| 17 | **Backend:** Check database | User exists in `leads` table | ⬜ | ⬜ | |
| 18 | **Backend:** Verify password | Password is hashed (bcrypt), not plain text | ⬜ | ⬜ | |
| 19 | **Backend:** Check activity log | CREATE action logged | ⬜ | ⬜ | |
| 20 | **Backend:** Try logging in as new user | Login works with created credentials | ⬜ | ⬜ | |

**Test Data:**
```json
{
  "contact_name": "Test Admin User",
  "email": "admintest@example.com",
  "company_name": "Test Company Inc",
  "industry": "Technology",
  "job_title": "QA Manager",
  "phone_number": "123-456-7890",
  "password": "SecurePass123!"
}
```

**SQL Verification:**
```sql
-- Check user was created
SELECT * FROM leads 
WHERE email = 'admintest@example.com';

-- Verify password is hashed
SELECT email, password_hash 
FROM leads 
WHERE email = 'admintest@example.com';
-- password_hash should start with $2b$ (bcrypt)

-- Check activity log
SELECT * FROM user_activities 
WHERE action_type = 'CREATE' 
  AND entity_type = 'user' 
ORDER BY created_at DESC 
LIMIT 1;
```

---

#### Test 1.3.4: Edit Existing User - Complete Flow
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Edit" button (pencil icon) on user row | Modal opens with pre-filled data | ⬜ | ⬜ | |
| 2 | Check modal title | "Edit User" | ⬜ | ⬜ | |
| 3 | Check all fields pre-populated | Name, email, company, industry, job title, phone filled in | ⬜ | ⬜ | |
| 4 | Check password field | Should be empty (security best practice) | ⬜ | ⬜ | |
| 5 | Change user name to "Updated Name" | Input updates | ⬜ | ⬜ | |
| 6 | Try changing email to existing email | Validation error: "Email already exists" | ⬜ | ⬜ | |
| 7 | Change email to new unique email | No error | ⬜ | ⬜ | |
| 8 | Update company name | Input updates | ⬜ | ⬜ | |
| 9 | Change industry from dropdown | Dropdown updates | ⬜ | ⬜ | |
| 10 | Leave password empty | Should update without changing password | ⬜ | ⬜ | |
| 11 | Enter new password: "NewPass123!" | Should update password hash | ⬜ | ⬜ | |
| 12 | Click "Update User" button | Loading spinner on button | ⬜ | ⬜ | |
| 13 | Wait for response | Success message appears | ⬜ | ⬜ | |
| 14 | Check modal closes | Modal disappears | ⬜ | ⬜ | |
| 15 | Check table updates | Changes show immediately in table row | ⬜ | ⬜ | |
| 16 | **Backend:** Check API call | `PUT /api/admin/users/:id` with updated data | ⬜ | ⬜ | |
| 17 | **Backend:** Check database | Changes saved in `leads` table | ⬜ | ⬜ | |
| 18 | **Backend:** Verify password update | If password changed, new hash saved | ⬜ | ⬜ | |
| 19 | **Backend:** Check activity log | UPDATE action logged | ⬜ | ⬜ | |
| 20 | **Backend:** Try login with new password | Login works if password was changed | ⬜ | ⬜ | |

**SQL Verification:**
```sql
-- Check user was updated
SELECT * FROM leads 
WHERE id = [USER_ID];

-- If password was changed, verify new hash
SELECT email, password_hash, updated_at 
FROM leads 
WHERE id = [USER_ID];
```

---

#### Test 1.3.5: View User Assessments
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "View Assessments" (eye icon) | Assessments modal opens | ⬜ | ⬜ | |
| 2 | Check modal title | "Assessments for [User Name]" | ⬜ | ⬜ | |
| 3 | Check user info displayed | Name, email, company shown at top | ⬜ | ⬜ | |
| 4 | If user has assessments | Table shows: Date, Type, Score, Industry columns | ⬜ | ⬜ | |
| 5 | If no assessments | "No assessments yet" message | ⬜ | ⬜ | |
| 6 | Check assessment rows | Each row has "View Details" button | ⬜ | ⬜ | |
| 7 | Click "View Details" on assessment | Opens detailed assessment modal | ⬜ | ⬜ | |
| 8 | Close detailed modal | Returns to assessments list | ⬜ | ⬜ | |
| 9 | Close assessments modal | Returns to users list | ⬜ | ⬜ | |
| 10 | **Backend:** Check API call | `GET /api/admin/users/:id/assessments` | ⬜ | ⬜ | |

---

#### Test 1.3.6: Delete User - Complete Flow
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Delete" button (trash icon) | Confirmation dialog appears | ⬜ | ⬜ | |
| 2 | Check confirmation message | "Are you sure you want to delete this user? This action cannot be undone." | ⬜ | ⬜ | |
| 3 | Click "Cancel" | Dialog closes, user NOT deleted | ⬜ | ⬜ | |
| 4 | Check user still in table | User row still visible | ⬜ | ⬜ | |
| 5 | Click "Delete" again | Confirmation appears again | ⬜ | ⬜ | |
| 6 | Click "Confirm" or "Delete" | Loading spinner shows | ⬜ | ⬜ | |
| 7 | Wait for response | Success message appears | ⬜ | ⬜ | |
| 8 | Check table refreshes | User removed from table | ⬜ | ⬜ | |
| 9 | Check page doesn't break | No JavaScript errors in console | ⬜ | ⬜ | |
| 10 | **Backend:** Check API call | `DELETE /api/admin/users/:id` | ⬜ | ⬜ | |
| 11 | **Backend:** Check database | User deleted or soft-deleted from `leads` table | ⬜ | ⬜ | |
| 12 | **Backend:** Check related data | User's assessments handled (cascade delete or orphaned) | ⬜ | ⬜ | |
| 13 | **Backend:** Check activity log | DELETE action logged with user details | ⬜ | ⬜ | |
| 14 | **Backend:** Try logging in as deleted user | Login fails with appropriate error | ⬜ | ⬜ | |

**SQL Verification:**
```sql
-- Check user was deleted (hard delete)
SELECT * FROM leads WHERE id = [USER_ID];
-- Should return 0 rows

-- OR check soft delete
SELECT * FROM leads WHERE id = [USER_ID];
-- Should have is_deleted = 1 or similar flag

-- Check related assessments
SELECT * FROM assessments WHERE lead_id = [USER_ID];
```

---

#### Test 1.3.7: Users Pagination
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Load users tab with >20 users | Pagination controls visible at bottom | ⬜ | ⬜ | |
| 2 | Check "Previous" button on page 1 | Disabled/grayed out | ⬜ | ⬜ | |
| 3 | Check page indicator | Shows "Page 1 of X" | ⬜ | ⬜ | |
| 4 | Click "Next" button | Page 2 loads, shows next 20 users | ⬜ | ⬜ | |
| 5 | Check page indicator updates | Shows "Page 2 of X" | ⬜ | ⬜ | |
| 6 | Check "Previous" now enabled | Button is clickable | ⬜ | ⬜ | |
| 7 | Click "Previous" | Returns to page 1 | ⬜ | ⬜ | |
| 8 | Navigate to last page | "Next" button disabled | ⬜ | ⬜ | |
| 9 | Check URL updates (if implemented) | URL has `?page=2` parameter | ⬜ | ⬜ | |
| 10 | Refresh page while on page 2 | Stays on page 2 | ⬜ | ⬜ | |
| 11 | **Backend:** Check API call | `GET /api/admin/users?page=2&limit=20` | ⬜ | ⬜ | |
| 12 | **Backend:** Verify pagination data | Response includes `{current_page, total_pages, total_count, has_next, has_prev}` | ⬜ | ⬜ | |

---

### 1.4 QUESTIONS TAB - COMPLETE CRUD

#### Test 1.4.1: Questions List Display
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Questions" tab | Tab activates, loads questions list | ⬜ | ⬜ | |
| 2 | Check "Create Question" button | Top right, blue button with `fa-plus` icon | ⬜ | ⬜ | |
| 3 | Check Assessment Type filter | Dropdown shows: "All Types", CORE, ADVANCED, FRONTIER, TEST, custom types | ⬜ | ⬜ | |
| 4 | Check Pillar filter | Dropdown shows: "All Pillars" + all pillar names | ⬜ | ⬜ | |
| 5 | Check table columns | #, Question Text, Type, Pillar, Order, Active, Actions | ⬜ | ⬜ | |
| 6 | Check loading spinner | Shows while fetching | ⬜ | ⬜ | |
| 7 | Check question rows | Populated with questions | ⬜ | ⬜ | |
| 8 | Check pagination | Visible if >20 questions | ⬜ | ⬜ | |
| 9 | Check "Active" column | Shows checkmark or "Active"/"Inactive" badge | ⬜ | ⬜ | |
| 10 | Check actions column | Edit and Delete buttons present | ⬜ | ⬜ | |

---

#### Test 1.4.2: Filter Questions by Assessment Type
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Action | Expected Result | ✓ | ✗ | Notes |
|---|--------|----------------|---|---|-------|
| 1 | Select "CORE" from type filter | Table shows only CORE questions | ⬜ | ⬜ | |
| 2 | Verify count updates | Shows correct number of CORE questions | ⬜ | ⬜ | |
| 3 | Select "ADVANCED" | Shows only ADVANCED questions | ⬜ | ⬜ | |
| 4 | Select "FRONTIER" | Shows only FRONTIER questions | ⬜ | ⬜ | |
| 5 | Select "TEST" | Shows only TEST questions | ⬜ | ⬜ | |
| 6 | Select custom type (TEST3) | Shows only TEST3 questions | ⬜ | ⬜ | |
| 7 | Select "All Types" | Shows all questions again | ⬜ | ⬜ | |
| 8 | **Backend:** Check API call | `GET /api/admin/questions?assessment_type=CORE` | ⬜ | ⬜ | |

---

#### Test 1.4.3: Filter Questions by Pillar
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Action | Expected Result | ✓ | ✗ | Notes |
|---|--------|----------------|---|---|-------|
| 1 | Select specific pillar from dropdown | Table shows only questions for that pillar | ⬜ | ⬜ | |
| 2 | Verify questions match pillar | All visible questions have correct pillar_name | ⬜ | ⬜ | |
| 3 | Combine type + pillar filters | Shows questions matching BOTH filters | ⬜ | ⬜ | |
| 4 | Select "All Pillars" | Shows all questions (type filter still applied if set) | ⬜ | ⬜ | |
| 5 | **Backend:** Check API call | `GET /api/admin/questions?pillar_name=Strategy` | ⬜ | ⬜ | |

---

#### Test 1.4.4: Create New Question - Complete Flow
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Create Question" button | Modal opens with empty form | ⬜ | ⬜ | |
| 2 | Check modal title | "Create New Question" | ⬜ | ⬜ | |
| 3 | Check form fields | Question Text (textarea), Assessment Type (dropdown), Pillar Name (dropdown), Question Order (number), Is Active (checkbox) | ⬜ | ⬜ | |
| 4 | Leave question text empty, submit | Validation error: "Question text is required" | ⬜ | ⬜ | |
| 5 | Enter question text | Textarea updates | ⬜ | ⬜ | |
| 6 | Check Assessment Type dropdown | Shows ALL types: CORE, ADVANCED, FRONTIER, TEST, TEST3, EXPERT, etc. | ⬜ | ⬜ | |
| 7 | Select assessment type | Dropdown updates | ⬜ | ⬜ | |
| 8 | Check Pillar dropdown | Shows all active pillars | ⬜ | ⬜ | |
| 9 | Select pillar | Dropdown updates | ⬜ | ⬜ | |
| 10 | Enter question order: 1 | Input accepts number | ⬜ | ⬜ | |
| 11 | Try entering non-number in order | Validation error or input blocked | ⬜ | ⬜ | |
| 12 | Check "Is Active" checkbox | Defaults to checked/true | ⬜ | ⬜ | |
| 13 | Toggle "Is Active" checkbox | Checkbox toggles on/off | ⬜ | ⬜ | |
| 14 | Fill all required fields | No validation errors | ⬜ | ⬜ | |
| 15 | Click "Create Question" | Loading spinner on button | ⬜ | ⬜ | |
| 16 | Wait for response | Success message appears | ⬜ | ⬜ | |
| 17 | Check modal closes | Modal disappears | ⬜ | ⬜ | |
| 18 | Check table refreshes | New question visible in list | ⬜ | ⬜ | |
| 19 | **Backend:** Check API call | `POST /api/admin/questions` | ⬜ | ⬜ | |
| 20 | **Backend:** Check database | Question exists in `assessment_questions` table | ⬜ | ⬜ | |
| 21 | **Backend:** Verify all fields saved | question_text, assessment_type, pillar_name, question_order, is_active | ⬜ | ⬜ | |
| 22 | **Backend:** Check activity log | CREATE action logged | ⬜ | ⬜ | |

**Test Data:**
```json
{
  "question_text": "How mature is your AI strategy framework?",
  "assessment_type": "CORE",
  "pillar_name": "Strategy & Vision",
  "question_order": 1,
  "is_active": true
}
```

**SQL Verification:**
```sql
-- Check question was created
SELECT * FROM assessment_questions 
WHERE question_text = 'How mature is your AI strategy framework?';

-- Verify all fields
SELECT 
  id,
  question_text,
  assessment_type,
  pillar_name,
  pillar_short_name,
  question_order,
  is_active,
  created_at
FROM assessment_questions 
WHERE id = [QUESTION_ID];
```

---

#### Test 1.4.5: Edit Existing Question - Complete Flow
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Edit" button on question row | Modal opens with pre-filled data | ⬜ | ⬜ | |
| 2 | Check modal title | "Edit Question" | ⬜ | ⬜ | |
| 3 | Check all fields pre-populated | Question text, type, pillar, order, active status all filled | ⬜ | ⬜ | |
| 4 | Change question text | Textarea updates | ⬜ | ⬜ | |
| 5 | Change assessment type from CORE to ADVANCED | Dropdown updates | ⬜ | ⬜ | |
| 6 | Change pillar | Dropdown updates | ⬜ | ⬜ | |
| 7 | Change order number from 1 to 5 | Number input updates | ⬜ | ⬜ | |
| 8 | Toggle active status | Checkbox toggles | ⬜ | ⬜ | |
| 9 | Click "Update Question" | Loading spinner | ⬜ | ⬜ | |
| 10 | Wait for response | Success message appears | ⬜ | ⬜ | |
| 11 | Check modal closes | Modal disappears | ⬜ | ⬜ | |
| 12 | Check table updates | Changes show immediately in table row | ⬜ | ⬜ | |
| 13 | **Backend:** Check API call | `PUT /api/admin/questions/:id` | ⬜ | ⬜ | |
| 14 | **Backend:** Check database | Changes saved in `assessment_questions` table | ⬜ | ⬜ | |
| 15 | **Backend:** Check activity log | UPDATE action logged | ⬜ | ⬜ | |

---

#### Test 1.4.6: Delete Question (Soft Delete) - Complete Flow
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Delete" button on question | Confirmation dialog appears | ⬜ | ⬜ | |
| 2 | Check confirmation message | "Are you sure you want to delete this question? This will soft-delete the question." | ⬜ | ⬜ | |
| 3 | Click "Cancel" | Question NOT deleted, dialog closes | ⬜ | ⬜ | |
| 4 | Click "Delete" again | Confirmation appears again | ⬜ | ⬜ | |
| 5 | Confirm deletion | Success message appears | ⬜ | ⬜ | |
| 6 | Check table refreshes | Question removed from visible list | ⬜ | ⬜ | |
| 7 | **Backend:** Check API call | `DELETE /api/admin/questions/:id` | ⬜ | ⬜ | |
| 8 | **Backend:** Check database | `is_active` = 0 in `assessment_questions` table | ⬜ | ⬜ | |
| 9 | **Backend:** Verify row still exists | Row NOT physically deleted, just marked inactive | ⬜ | ⬜ | |
| 10 | **Backend:** Check question in assessments | Question not shown in new assessments | ⬜ | ⬜ | |
| 11 | **Backend:** Check activity log | DELETE action logged | ⬜ | ⬜ | |

**SQL Verification:**
```sql
-- Verify soft delete
SELECT * FROM assessment_questions 
WHERE id = [QUESTION_ID];
-- is_active should be 0, row should still exist

-- Check question doesn't appear in active list
SELECT * FROM assessment_questions 
WHERE assessment_type = 'CORE' 
  AND is_active = 1;
```

---

#### Test 1.4.7: Questions Pagination
**Priority:** 🟡 High  
**Type:** Frontend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Load questions tab with >20 questions | Pagination controls visible | ⬜ | ⬜ | |
| 2 | Check "Previous" on page 1 | Disabled | ⬜ | ⬜ | |
| 3 | Click "Next" | Page 2 loads, next 20 questions | ⬜ | ⬜ | |
| 4 | Check page indicator | "Page 2 of X" | ⬜ | ⬜ | |
| 5 | Click "Previous" | Returns to page 1 | ⬜ | ⬜ | |
| 6 | Navigate to last page | "Next" disabled | ⬜ | ⬜ | |

---

### 1.5 ASSESSMENTS TAB

#### Test 1.5.1: Assessments List Display
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Assessments" tab | Tab activates, loads assessments | ⬜ | ⬜ | |
| 2 | Check table columns | Date, User, Type, Industry, Score, Actions | ⬜ | ⬜ | |
| 3 | Check loading spinner | Shows while fetching | ⬜ | ⬜ | |
| 4 | Check assessment rows | Populated with data | ⬜ | ⬜ | |
| 5 | Check score badges | Color-coded: Green (≥80), Blue (60-79), Orange (<60) | ⬜ | ⬜ | |
| 6 | Check date formatting | Human-readable format (e.g., "Jan 27, 2026") | ⬜ | ⬜ | |
| 7 | Check pagination | Visible if >10 assessments | ⬜ | ⬜ | |
| 8 | Check "View Details" buttons | Present on each row | ⬜ | ⬜ | |
| 9 | Check "Delete" buttons | Present on each row | ⬜ | ⬜ | |

---

#### Test 1.5.2: View Assessment Details - Complete Flow
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "View Details" button | Assessment detail modal opens | ⬜ | ⬜ | |
| 2 | Check modal title | "Assessment Details" | ⬜ | ⬜ | |
| 3 | Check user information | Name, email, company displayed | ⬜ | ⬜ | |
| 4 | Check assessment metadata | Type, industry, date, overall score shown | ⬜ | ⬜ | |
| 5 | Check dimension/pillar scores | All pillar scores with percentages and names | ⬜ | ⬜ | |
| 6 | Check insights section | Maturity level (e.g., "AI Leader"), completion time | ⬜ | ⬜ | |
| 7 | Check responses section (if shown) | Individual question responses visible | ⬜ | ⬜ | |
| 8 | Check close button | X button or "Close" button present | ⬜ | ⬜ | |
| 9 | Close modal | Returns to assessments list | ⬜ | ⬜ | |
| 10 | **Backend:** Check API call | `GET /api/admin/assessments/:id` | ⬜ | ⬜ | |

---

#### Test 1.5.3: Delete Assessment - Complete Flow
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Delete" button | Confirmation dialog appears | ⬜ | ⬜ | |
| 2 | Check message | "Are you sure you want to delete this assessment?" | ⬜ | ⬜ | |
| 3 | Click "Cancel" | Assessment NOT deleted | ⬜ | ⬜ | |
| 4 | Click "Delete" again, confirm | Success message appears | ⬜ | ⬜ | |
| 5 | Check table refreshes | Assessment removed from list | ⬜ | ⬜ | |
| 6 | **Backend:** Check API call | `DELETE /api/admin/assessments/:id` | ⬜ | ⬜ | |
| 7 | **Backend:** Check database | Assessment removed from `assessments` table | ⬜ | ⬜ | |
| 8 | **Backend:** Check activity log | DELETE action logged | ⬜ | ⬜ | |

---

### 1.6 CONFIGURATION TAB

#### Test 1.6.1: Assessment Types Configuration Display
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| Configuration tab | Click activates tab | ⬜ | ⬜ | |
| "Assessment Types" section | Heading visible | ⬜ | ⬜ | |
| Types list | Shows: CORE, ADVANCED, FRONTIER, TEST, custom types | ⬜ | ⬜ | |
| Type cards | Each card shows: Title, Description, Duration, Icon, Features, Audience | ⬜ | ⬜ | |
| "Add New Type" form | Form visible with all input fields | ⬜ | ⬜ | |

---

#### Test 1.6.2: Create New Assessment Type - Complete Flow
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Scroll to "Add New Assessment Type" form | Form visible | ⬜ | ⬜ | |
| 2 | Enter Type Code: "EXPERT" | Input updates | ⬜ | ⬜ | |
| 3 | Enter Display Title: "Expert Assessment" | Input updates | ⬜ | ⬜ | |
| 4 | Enter Description | Textarea updates | ⬜ | ⬜ | |
| 5 | Enter Duration: "30 questions • ~6 minutes" | Input updates | ⬜ | ⬜ | |
| 6 | Enter Icon: "fas fa-star" | Input updates | ⬜ | ⬜ | |
| 7 | Enter Features (comma-separated) | Input updates | ⬜ | ⬜ | |
| 8 | Enter Audience: "Senior Leaders" | Input updates | ⬜ | ⬜ | |
| 9 | Select Audience Color | Dropdown: blue, green, orange, purple, red | ⬜ | ⬜ | |
| 10 | Click "Create Assessment Type" | Loading spinner | ⬜ | ⬜ | |
| 11 | Wait for response | Success message appears | ⬜ | ⬜ | |
| 12 | Check types list | New type visible in list | ⬜ | ⬜ | |
| 13 | **Backend:** Check database | Type in `assessment_types_config` table | ⬜ | ⬜ | |
| 14 | **Frontend:** Go to home screen | New assessment card appears | ⬜ | ⬜ | |
| 15 | **Admin:** Go to Questions tab | Type available in dropdown | ⬜ | ⬜ | |

**Test Data:**
```json
{
  "assessment_type": "EXPERT",
  "title": "Expert Assessment",
  "description": "Advanced evaluation for AI experts and consultants",
  "duration": "40 questions • ~8 minutes",
  "icon": "fas fa-graduation-cap",
  "features": "Deep technical analysis, Advanced AI capabilities, Expert-level insights",
  "audience": "AI Specialists & Consultants",
  "audience_color": "purple"
}
```

---

#### Test 1.6.3: Delete Assessment Type
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Check default types | CORE, ADVANCED, FRONTIER have NO delete button (or disabled) | ⬜ | ⬜ | |
| 2 | Click "Delete" on custom type (EXPERT) | Confirmation dialog | ⬜ | ⬜ | |
| 3 | Confirm deletion | Success message | ⬜ | ⬜ | |
| 4 | Check types list | Type removed | ⬜ | ⬜ | |
| 5 | **Backend:** Check database | Removed from `assessment_types_config` | ⬜ | ⬜ | |
| 6 | **Frontend:** Go to home screen | Card no longer appears | ⬜ | ⬜ | |

---

#### Test 1.6.4: Industries Configuration
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| "Industries" section | Heading visible | ⬜ | ⬜ | |
| Industries list | All industries shown | ⬜ | ⬜ | |
| "Add New Industry" form | Input field + button | ⬜ | ⬜ | |
| Delete buttons | Each industry has delete button | ⬜ | ⬜ | |

---

#### Test 1.6.5: Create New Industry
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Enter industry name: "Agriculture" | Input updates | ⬜ | ⬜ | |
| 2 | Click "Add Industry" button | Success message | ⬜ | ⬜ | |
| 3 | Check list | Industry visible | ⬜ | ⬜ | |
| 4 | **Backend:** Check database | In `industries` table | ⬜ | ⬜ | |
| 5 | **Frontend:** Go to registration form | Industry in dropdown | ⬜ | ⬜ | |

---

#### Test 1.6.6: Delete Industry
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Delete" on industry | Confirmation dialog | ⬜ | ⬜ | |
| 2 | Confirm deletion | Success message | ⬜ | ⬜ | |
| 3 | Check list | Industry removed | ⬜ | ⬜ | |
| 4 | **Backend:** Check database | Deleted from `industries` | ⬜ | ⬜ | |

---

#### Test 1.6.7: Pillars Configuration Display
**Priority:** 🟢 Medium  
**Type:** Frontend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| "Pillars" section | Heading "Assessment Pillars" visible | ⬜ | ⬜ | |
| Pillars list | All pillars with names + short codes (e.g., "Strategy & Vision" / "STR") | ⬜ | ⬜ | |
| Edit buttons | Each pillar has edit icon | ⬜ | ⬜ | |
| Toggle active buttons | Each pillar has toggle icon | ⬜ | ⬜ | |
| Delete buttons | Each pillar has delete icon | ⬜ | ⬜ | |
| "Add New Pillar" form | Form with: Name, Short Name, Description fields | ⬜ | ⬜ | |

---

#### Test 1.6.8: Create New Pillar
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Enter Pillar Name: "Innovation & R&D" | Input updates | ⬜ | ⬜ | |
| 2 | Enter Short Name: "INNOV" | Input updates | ⬜ | ⬜ | |
| 3 | Enter Description (optional) | Textarea updates | ⬜ | ⬜ | |
| 4 | Click "Add Pillar" | Success message | ⬜ | ⬜ | |
| 5 | Check pillars list | New pillar visible | ⬜ | ⬜ | |
| 6 | **Backend:** Check database | Pillar saved | ⬜ | ⬜ | |
| 7 | **Admin:** Go to Questions tab | Pillar appears in dropdown | ⬜ | ⬜ | |

---

#### Test 1.6.9: Edit Pillar
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Edit" button on pillar | Inline edit mode or modal opens | ⬜ | ⬜ | |
| 2 | Change pillar name | Input updates | ⬜ | ⬜ | |
| 3 | Change short name | Input updates | ⬜ | ⬜ | |
| 4 | Save changes | Success message | ⬜ | ⬜ | |
| 5 | Check list | Updated info displayed | ⬜ | ⬜ | |
| 6 | **Backend:** Check database | Changes saved | ⬜ | ⬜ | |

---

#### Test 1.6.10: Toggle Pillar Active Status
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click toggle button on active pillar | Pillar becomes inactive | ⬜ | ⬜ | |
| 2 | Check visual indicator | Gray/faded or "Inactive" badge | ⬜ | ⬜ | |
| 3 | Click toggle again | Pillar becomes active | ⬜ | ⬜ | |
| 4 | **Admin:** Go to Questions creation | Inactive pillars hidden or disabled in dropdown | ⬜ | ⬜ | |
| 5 | **Backend:** Check database | `is_active` field toggled | ⬜ | ⬜ | |

---

#### Test 1.6.11: Delete Pillar
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Delete" on pillar | Confirmation dialog | ⬜ | ⬜ | |
| 2 | If pillar has questions | Warning: "This pillar has X questions. Delete anyway?" | ⬜ | ⬜ | |
| 3 | Confirm deletion | Success message | ⬜ | ⬜ | |
| 4 | Check list | Pillar removed | ⬜ | ⬜ | |
| 5 | **Backend:** Check database | Pillar deleted | ⬜ | ⬜ | |
| 6 | **Backend:** Check questions | Questions with that pillar handled (cascade or orphaned) | ⬜ | ⬜ | |

---

### 1.7 ACTIVITY LOGS TAB

#### Test 1.7.1: Activity Logs Display
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| Activity Logs tab | Click activates | ⬜ | ⬜ | |
| Action Type filter | Dropdown: All, CREATE, UPDATE, DELETE, VIEW, LOGIN | ⬜ | ⬜ | |
| Entity Type filter | Dropdown: All, admin, user, question, assessment | ⬜ | ⬜ | |
| Activity table | Columns: Timestamp, Admin, Action, Entity, Description, IP | ⬜ | ⬜ | |
| Activity rows | Populated with log entries | ⬜ | ⬜ | |
| Pagination | Shows if >50 entries | ⬜ | ⬜ | |
| Timestamps | Human-readable (e.g., "Jan 27, 2026 2:30 PM") | ⬜ | ⬜ | |

---

#### Test 1.7.2: Filter by Action Type
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Action | Expected Result | ✓ | ✗ | Notes |
|---|--------|----------------|---|---|-------|
| 1 | Select "CREATE" | Shows only CREATE actions | ⬜ | ⬜ | |
| 2 | Select "UPDATE" | Shows only UPDATE actions | ⬜ | ⬜ | |
| 3 | Select "DELETE" | Shows only DELETE actions | ⬜ | ⬜ | |
| 4 | Select "LOGIN" | Shows only login events | ⬜ | ⬜ | |
| 5 | Select "All" | Shows all activity types | ⬜ | ⬜ | |

---

#### Test 1.7.3: Filter by Entity Type
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| # | Action | Expected Result | ✓ | ✗ | Notes |
|---|--------|----------------|---|---|-------|
| 1 | Select "user" | Shows only user-related activities | ⬜ | ⬜ | |
| 2 | Select "question" | Shows only question activities | ⬜ | ⬜ | |
| 3 | Select "assessment" | Shows only assessment activities | ⬜ | ⬜ | |
| 4 | Select "admin" | Shows only admin activities | ⬜ | ⬜ | |
| 5 | Combine action + entity | Shows activities matching BOTH filters | ⬜ | ⬜ | |

---

### 1.8 NAVIGATION & UI ELEMENTS

#### Test 1.8.1: Top Navigation Bar
**Priority:** 🟡 High  
**Type:** Frontend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| "Back to Home" button | Top left with `fa-arrow-left` icon | ⬜ | ⬜ | |
| "Back to Home" click | Redirects to `/` (welcome screen) | ⬜ | ⬜ | |
| Admin user info | Shows admin name + role | ⬜ | ⬜ | |
| Admin user icon | `fa-user-shield` icon | ⬜ | ⬜ | |
| Logout button | Top right with `fa-sign-out-alt` icon | ⬜ | ⬜ | |
| Logout click | Logs out admin, redirects to login | ⬜ | ⬜ | |

---

#### Test 1.8.2: Tab Navigation
**Priority:** 🟡 High  
**Type:** Frontend

| Tab | Icon | Click Action | ✓ | ✗ | Notes |
|-----|------|-------------|---|---|-------|
| Dashboard | `fa-chart-line` | Loads dashboard stats | ⬜ | ⬜ | |
| Users | `fa-users` | Loads users list | ⬜ | ⬜ | |
| Questions | `fa-question-circle` | Loads questions list | ⬜ | ⬜ | |
| Assessments | `fa-clipboard-check` | Loads assessments list | ⬜ | ⬜ | |
| Configuration | `fa-cog` | Loads config section | ⬜ | ⬜ | |
| Activity Logs | `fa-history` | Loads activity logs | ⬜ | ⬜ | |
| Active tab highlight | Visual | Different background/border color | ⬜ | ⬜ | |

---

#### Test 1.8.3: Responsive Design
**Priority:** 🟢 Medium  
**Type:** Frontend

| Viewport | Expected Behavior | ✓ | ✗ | Notes |
|----------|------------------|---|---|-------|
| Desktop (1920x1080) | All elements visible, proper spacing | ⬜ | ⬜ | |
| Laptop (1366x768) | Layout adapts, no horizontal scroll | ⬜ | ⬜ | |
| Tablet (768x1024) | Responsive layout, readable text | ⬜ | ⬜ | |
| Mobile (375x667) | Mobile-friendly, touch-optimized | ⬜ | ⬜ | |

---

#### Test 1.8.4: Loading States
**Priority:** 🟡 High  
**Type:** Frontend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| Dashboard stats | Spinner while loading | ⬜ | ⬜ | |
| Users list | Spinner while loading | ⬜ | ⬜ | |
| Questions list | Spinner while loading | ⬜ | ⬜ | |
| Assessments list | Spinner while loading | ⬜ | ⬜ | |
| Configuration | Spinner while loading | ⬜ | ⬜ | |
| Modal forms | Button spinner on submit | ⬜ | ⬜ | |

---

#### Test 1.8.5: Error States & Handling
**Priority:** 🔴 Critical  
**Type:** Frontend + Backend

| Scenario | Expected Behavior | ✓ | ✗ | Notes |
|----------|------------------|---|---|-------|
| API request fails (500) | "Failed to load data" + retry button | ⬜ | ⬜ | |
| Network timeout | Timeout error + retry option | ⬜ | ⬜ | |
| Unauthorized (401) | Auto-redirect to login | ⬜ | ⬜ | |
| Forbidden (403) | "You don't have permission" message | ⬜ | ⬜ | |
| Not Found (404) | "Resource not found" message | ⬜ | ⬜ | |
| Validation errors | Clear error messages on form fields | ⬜ | ⬜ | |
| Network offline | "No internet connection" message | ⬜ | ⬜ | |

---

### 1.9 SUPER ADMIN FEATURES (If Applicable)

#### Test 1.9.1: Admin Management Display
**Priority:** 🟢 Medium  
**Type:** Frontend + Backend

| Element | Check | ✓ | ✗ | Notes |
|---------|-------|---|---|-------|
| "Admins" tab/section | Only visible for super_admin role | ⬜ | ⬜ | |
| "Create Admin" button | Shows button | ⬜ | ⬜ | |
| Admins list table | Shows: Username, Email, Full Name, Role, Status, Actions | ⬜ | ⬜ | |
| Current user highlighted | Visual indicator for logged-in admin | ⬜ | ⬜ | |

---

#### Test 1.9.2: Create New Admin Account
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Create Admin" button | Modal opens with form | ⬜ | ⬜ | |
| 2 | Enter admin username | Input updates | ⬜ | ⬜ | |
| 3 | Enter admin email | Input updates | ⬜ | ⬜ | |
| 4 | Enter admin password | Masked input | ⬜ | ⬜ | |
| 5 | Enter full name | Input updates | ⬜ | ⬜ | |
| 6 | Select role | Dropdown: admin / super_admin | ⬜ | ⬜ | |
| 7 | Submit form | Success message | ⬜ | ⬜ | |
| 8 | Check admins list | New admin visible | ⬜ | ⬜ | |
| 9 | **Backend:** Check database | Admin in `admins` table with bcrypt hash | ⬜ | ⬜ | |
| 10 | **Backend:** Try login as new admin | Login works | ⬜ | ⬜ | |

---

#### Test 1.9.3: Deactivate Admin Account
**Priority:** 🟡 High  
**Type:** Frontend + Backend

| # | Step | Expected Result | ✓ | ✗ | Notes |
|---|------|----------------|---|---|-------|
| 1 | Click "Deactivate" on admin (not self) | Confirmation dialog | ⬜ | ⬜ | |
| 2 | Try deactivating own account | Error: "Cannot deactivate your own account" | ⬜ | ⬜ | |
| 3 | Confirm deactivation | Success message | ⬜ | ⬜ | |
| 4 | Check visual indicator | Grayed out or "Inactive" badge | ⬜ | ⬜ | |
| 5 | **Backend:** Try login as deactivated admin | Login blocked | ⬜ | ⬜ | |
| 6 | **Backend:** Check database | `is_active` = 0 | ⬜ | ⬜ | |

---

## 📊 ADMIN PORTAL TEST SUMMARY

**Total Test Cases:** 120+  
**Sections Covered:** 9  

### Completion Checklist:
- [ ] 1.1 Authentication & Session (15 tests)
- [ ] 1.2 Dashboard Statistics (15 tests)
- [ ] 1.3 Users CRUD (35 tests)
- [ ] 1.4 Questions CRUD (30 tests)
- [ ] 1.5 Assessments (10 tests)
- [ ] 1.6 Configuration (20 tests)
- [ ] 1.7 Activity Logs (10 tests)
- [ ] 1.8 Navigation & UI (20 tests)
- [ ] 1.9 Super Admin (10 tests)

---

## 🚀 NEXT SECTIONS

This document covers **SECTION 1: ADMIN PORTAL** testing in complete detail.

**Remaining sections to be tested:**
- Section 2: User Portal Testing
- Section 3: Public/Guest Features Testing
- Section 4: API Endpoints Testing
- Section 5: Database & Data Integrity Testing
- Section 6: Security & Authentication Testing
- Section 7: Email & Notifications Testing
- Section 8: Performance & Load Testing
- Section 9: UI/UX & Accessibility Testing
- Section 10: Integration & E2E Testing

---

## 📝 NOTES & ISSUES LOG

| Date | Tester | Issue Found | Severity | Status | Resolution |
|------|--------|-------------|----------|--------|------------|
| | | | | | |
| | | | | | |
| | | | | | |

---

**Document Version:** 1.0  
**Last Updated:** January 27, 2026  
**Next Review Date:** __________
