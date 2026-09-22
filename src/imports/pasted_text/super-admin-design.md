Continue building the EXISTING CAPACITI responsive web app prototype.

IMPORTANT:
Do NOT rebuild, replace, or redesign any existing Candidate or Mentor pages.
Do NOT change the existing colour palette, typography, login/portal screens, sidebar designs, components, interactions, or existing functionality.

Keep everything already built in this prototype intact.

We are now adding a THIRD portal/interface for SUPER ADMIN.

SUPER ADMIN DESIGN DIRECTION

The Super Admin interface must look visually different from the Candidate and Mentor interfaces while still clearly belonging to the same CAPACITI system.

Candidate and Mentor interfaces use the existing left sidebar.

Super Admin must NOT use a sidebar.

Use a full-width TOP NAVIGATION BAR for all Super Admin pages.

SUPER ADMIN TOP NAVIGATION

Use Space Cadet (#1D2951) as the navigation background.

Place the existing CAPACITI logo on the left.
Use the existing CAPACITI logo asset already available in this project. Do not recreate, crop, simplify, distort, or replace the logo.

Navigation links:
- Dashboard
- User Management
- Access & Configuration
- System Activity

On the right:
- Notification bell
- Super Admin avatar/account
- Dropdown/logout control

Use a subtle purple underline to indicate the active navigation item.

Keep the Super Admin workspace light, spacious, professional and consistent with the visual language already used throughout the prototype.

Use:
- Space Cadet for primary headings/text
- Purple for active states, buttons and selected navigation
- Coral/red sparingly for alerts or attention states
- White/light neutral backgrounds
- Clean rounded cards and subtle borders/shadows

Do not use excessive gradients.
Do not use glassmorphism.
Do not overcrowd pages.
Do not add unnecessary charts, slogans, marketing text, quick actions or sections just to fill empty space.

Empty space is intentional.

-----------------------------------
SUPER ADMIN DASHBOARD
-----------------------------------

Create the Super Admin Dashboard using the top-navigation layout.

Display:

Current date

Heading:
Good morning, Admin. 👋🏽

Subheading:
Here’s an overview of the CAPACITI system.

Below this, display four informational cards in a clean 2x2 layout:

1. Total Users
   128
   System users

2. Candidates
   96
   Registered candidates

3. Mentors
   32
   Registered mentors

4. System Alerts
   3
   Alerts requiring attention

These cards are INFORMATIONAL ONLY.

They must NOT be clickable.
Do not add arrows or navigation behaviour to the cards.
Do not add charts, recent activity or additional dashboard sections.

-----------------------------------
USER MANAGEMENT
-----------------------------------

Create a User Management page using the SAME Super Admin top navigation.

Heading:
User Management

Subheading:
Manage system users and their access.

Keep this page minimal using progressive disclosure.

DEFAULT STATE:

Show:
- + Add User button
- A collapsed section labelled "System Users (128)"

Do NOT display the user list by default.
Do NOT display the Add User form by default.

The page should initially remain clean and spacious.

ADD USER INTERACTION:

When the Super Admin clicks "+ Add User", reveal an Add User form.

The form should contain:

- Full Name *
- CAPACITI Email *
- Role *

When Role = Candidate:
Show:
- Cohort * — single-select dropdown

When Role = Mentor:
Show:
- Assigned Cohort(s) * — allow one or multiple cohort selections

Candidates belong to one cohort.
Mentors can be assigned to one or multiple cohorts.

Include:
- Cancel
- Create User

After successful user creation:
- Show a simple confirmation
- Hide/close the Add User form again
- Return the page to its normal state

The system will issue a temporary password after account creation.

Do NOT invent how the temporary password is delivered.

SYSTEM USERS INTERACTION:

When "System Users (128)" is clicked, expand the section and reveal the user list.

Only after this section has been expanded, show:
- Search
- Role filter
- Cohort filter

Keep the user table/list simple.

Show essential user information such as:
- Name
- CAPACITI email
- Role
- Cohort / Assigned Cohorts

Use a three-dot menu (...) for contextual user actions instead of placing multiple action buttons in every row.

Allow the section to be collapsed again.

Do NOT create a separate Cohort Management section.
Cohorts are used only for assigning Candidates and Mentors and for filtering users.

Do NOT invent additional user-management functionality.

-----------------------------------
ACCESS & CONFIGURATION
-----------------------------------

Keep Access & Configuration in the Super Admin top navigation.

Create only a minimal placeholder page for now because the exact system-wide configuration requirements have not yet been defined.

Heading:
Access & Configuration

Subheading:
Manage system-wide access and configuration.

Do NOT invent configuration settings, permissions or business rules.

Keep the page intentionally minimal so this functionality can be defined later.

-----------------------------------
SYSTEM ACTIVITY
-----------------------------------

Create a System Activity page using the SAME Super Admin top-navigation design.

The active purple underline should move to "System Activity".

Heading:
System Activity

Subheading:
View activity across the CAPACITI system.

Provide simple controls for:
- Search activity
- Activity Type
- Date

Below the controls, display a clean chronological activity table/list.

Use columns:

Activity
User
Role
Date & Time
Details

Example prototype activity records may include:
- User account created
- User logged in
- WFH request approved
- User account deleted
- Ticket log submitted

These records are prototype examples only.

The Super Admin uses this page for oversight.

Do NOT add Edit or Delete actions to activity records.

A small chevron can be used on each activity row to reveal additional details when clicked.

Keep additional details hidden by default.

Do not overcrowd the page.

-----------------------------------
SYSTEM ALERTS / NOTIFICATIONS
-----------------------------------

The Super Admin receives in-app alerts for system-level anomalies through the notification bell in the top navigation.

Keep the bell visible across all Super Admin pages.

Do NOT invent specific anomaly detection rules because these have not yet been defined.

-----------------------------------
ROUTING / PROTOTYPE CONNECTION
-----------------------------------

Connect the Super Admin interface to the EXISTING prototype.

The existing portal-selection/login flow currently contains Candidate and Mentor.

Add Super Admin as the third portal option for prototype navigation so all three interfaces can be demonstrated:

Candidate
Mentor
Super Admin

Selecting Super Admin should open the new Super Admin Dashboard.

Candidate must continue routing to the existing Candidate interface.
Mentor must continue routing to the existing Mentor interface.

Do NOT modify or break their existing routes/pages.

All Super Admin navigation links must work:
Dashboard → Super Admin Dashboard
User Management → User Management
Access & Configuration → Access & Configuration
System Activity → System Activity

Maintain responsive behaviour.

MOST IMPORTANT:
Extend the current prototype instead of rebuilding it.
Preserve all existing Candidate and Mentor work exactly as it is.