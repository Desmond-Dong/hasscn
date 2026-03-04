# Music Assistant 文档下载脚本
$REPO = "music-assistant/music-assistant.io"
$DOCS_PATH = "src/content/docs"
$OUTPUT_DIR = ".sync-temp\music-assistant"

Write-Host "============================================================"
Write-Host "Music Assistant 文档下载工具"
Write-Host "============================================================"
Write-Host ""

# 创建输出目录
if (-not (Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR -Force | Out-Null
}

# 递归获取所有文件
function Get-AllFiles {
    param ([string]$Path)
    
    $files = @()
    $items = gh api "repos/$REPO/contents/$Path" 2>$null | ConvertFrom-Json
    
    foreach ($item in $items) {
        if ($item.type -eq "dir") {
            $subFiles = Get-AllFiles -Path $item.path
            $files = $files + $subFiles
        }
        elseif ($item.type -eq "file" -and $item.name -like "*.md") {
            $files = $files + @([PSCustomObject]@{
                path = $item.path
                relativePath = $item.path.Replace("$DOCS_PATH/", "")
                download_url = $item.download_url
            })
        }
    }
    return $files
}

# 获取所有文件
Write-Host "获取文件列表..." -ForegroundColor Yellow
$allFiles = Get-AllFiles -Path $DOCS_PATH
Write-Host "找到 $($allFiles.Count) 个文档文件" -ForegroundColor Green

# 下载文件
$downloaded = 0
foreach ($file in $allFiles) {
    $localPath = Join-Path $OUTPUT_DIR $file.relativePath
    $localDir = Split-Path $localPath -Parent
    
    if (-not (Test-Path $localDir)) {
        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
    }
    
    Write-Host "  下载: $($file.relativePath)" -ForegroundColor Cyan
    curl -s -o $localPath $file.download_url
    $downloaded++
}

Write-Host ""
Write-Host "============================================================"
Write-Host "完成! 下载了 $downloaded 个文件" -ForegroundColor Green
Write-Host "保存位置: $OUTPUT_DIR" -ForegroundColor Green
Write-Host "============================================================"
