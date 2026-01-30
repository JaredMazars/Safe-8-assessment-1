# Test admin login on Azure
$azureUrl = "https://safe-8-assessment-d8cdftfveefggkgu.canadacentral-01.azurewebsites.net"

Write-Host "Testing Azure health endpoint..." -ForegroundColor Cyan
try {
    $health = Invoke-WebRequest -Uri "$azureUrl/health" -Method GET -UseBasicParsing
    Write-Host "✅ Health check passed!" -ForegroundColor Green
    $health.Content | ConvertFrom-Json | ConvertTo-Json
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTesting Azure admin login..." -ForegroundColor Cyan

$body = @{
    username = "admin"
    password = "Admin123!"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest `
        -Uri "$azureUrl/api/admin/login" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -UseBasicParsing
    
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Yellow
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Login failed!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}
