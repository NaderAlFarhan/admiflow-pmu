# SharePoint Data Model

| Column Name | Type | Description |
|-------------|------|-------------|
| StudentID | Single line of text | Unique identifier for the applicant |
| FullName | Single line of text | Applicant full name |
| Email | Single line of text | Contact email address |
| Program | Choice | Target academic program |
| Decision | Choice | `Pending`, `Accepted`, or `Rejected` |
| Notes | Multiple lines of text | Internal review notes |

The associated Power Automate flow uses the **Decision** column to trigger email notifications and archival actions when records are created or updated.
