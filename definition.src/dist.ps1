Write-Output "`n"
Write-Output "Copying files to delivery app"

Remove-Item -Recurse -Force ..\delivery.src\Backslash\_client
Remove-Item -Recurse -Force ..\delivery.src\Backslash\_templates
Remove-Item -Recurse -Force ..\delivery.src\Backslash\yuzu-def-ui

xcopy /s /q /y dist ..\\delivery.src\\Backslash

Write-Output "`n"

Write-Output "Updating Master Views with new script references"

function Update-Script {

    param (
        $FilePattern,
        $ParentDir,
        $ViewPath
    )

    $NewFilename = Get-ChildItem -Path $path -Force -Filter $FilePattern -Recurse -File | Select-Object -First 1

    $ViewPathPattern = $ParentDir +"/"+ $FilePattern
    $NewFilename = $ParentDir +"/"+ $NewFilename.Name

    Write-Output $ViewPathPattern
    Write-Output $NewFilename

    (Get-Content $ViewPath -raw) -Replace $ViewPathPattern, $NewFilename | Set-Content $ViewPath

    Write-Output "$($FilePattern) file pattern written to $($ViewPath)"

}

Update-Script -FilePattern 'websiteScripts.*.js' -ParentDir 'script' -ViewPath '..\delivery.src\Backslash\Views\master.cshtml'
Update-Script -FilePattern 'frontendStyles.*.css' -ParentDir 'style' -ViewPath '..\delivery.src\Backslash\Views\master.cshtml'
