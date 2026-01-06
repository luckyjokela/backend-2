@echo off
npx tsc --noEmit --project tsconfig.json
if %errorlevel% == 0 (
  echo ✅ Нет ошибок TypeScript
) else (
  echo ❌ Ошибки найдены — скопированы в буфер
  npx tsc --noEmit --project tsconfig.json 2>&1 | clip
)
pause