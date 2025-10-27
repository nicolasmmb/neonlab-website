#!/bin/bash

echo "🧹 Limpando cache do Next.js..."

# Remove .next
rm -rf .next

# Remove node_modules/.cache
rm -rf node_modules/.cache

echo "✅ Cache limpo!"
echo ""
echo "Execute novamente:"
echo "npm run dev"
