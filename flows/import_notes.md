# Power Automate Import Notes

1. Import `admissions_flow_skeleton.json` into Power Automate.
2. Rebind the SharePoint trigger to the `Applicants` list.
3. Update HTTP action to call the deployed API `/evaluate` endpoint.
4. Configure Outlook action to use templates from `emails/` directory.
5. Replace placeholder connections for SharePoint and Outlook during import.
