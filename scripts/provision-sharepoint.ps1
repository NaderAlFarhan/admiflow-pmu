param(
  [string]$SiteUrl = "https://tenant.sharepoint.com/sites/Admissions-Office"
)

# Connect to SharePoint
Connect-PnPOnline -Url $SiteUrl -Interactive

$schema = Get-Content "$PSScriptRoot/../sharepoint/list_schema.json" | ConvertFrom-Json

foreach ($list in $schema.lists) {
  Write-Host "Creating list" $list.title
  New-PnPList -Title $list.title -Template GenericList -OnQuickLaunch -ErrorAction SilentlyContinue
  foreach ($field in $list.fields) {
    $params = @{List $list.title; DisplayName $field.DisplayName; InternalName $field.InternalName; Type $field.Type; Required ($field.Required -eq $true); AddToDefaultView $true}
    if ($field.Type -eq 'Choice') { $params.Add('Choices', $field.Choices) }
    Add-PnPField @params -ErrorAction SilentlyContinue
  }
}

# Graph API example payload for creating a column
<#
POST https://graph.microsoft.com/v1.0/sites/{site-id}/lists/{list-id}/columns
{
  "name": "ProgramType",
  "text": {"allowMultipleLines": false},
  "choice": {"choices": ["Engineering", "NonEngineering"]}
}
#>
