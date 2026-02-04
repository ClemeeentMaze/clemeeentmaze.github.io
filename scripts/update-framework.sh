#!/bin/bash
# ============================================================================
# Update Framework Script
# ============================================================================
# This script updates the framework/infrastructure files from the upstream
# boilerplate repository while preserving your prototypes.
#
# Usage:
#   ./scripts/update-framework.sh
#
# The script will:
#   1. Add/fetch from the upstream repository
#   2. Checkout framework files from upstream/main
#   3. Never touch src/prototypes/ (your work is safe)
# ============================================================================

set -e

# Configuration
UPSTREAM_REPO="${UPSTREAM_REPO:-https://github.com/guillermogineste/ai-prototyping-boilerplate.git}"
UPSTREAM_BRANCH="${UPSTREAM_BRANCH:-main}"

echo "🔄 Updating framework from boilerplate..."
echo "   Repository: $UPSTREAM_REPO"
echo "   Branch: $UPSTREAM_BRANCH"
echo ""

# Add upstream remote if it doesn't exist
if ! git remote get-url upstream &>/dev/null; then
  echo "📎 Adding upstream remote..."
  git remote add upstream "$UPSTREAM_REPO"
fi

# Fetch latest from upstream
echo "📥 Fetching from upstream..."
git fetch upstream

# Show current vs upstream version
if [ -f "boilerplate-version.json" ]; then
  CURRENT_VERSION=$(grep '"version"' boilerplate-version.json | sed 's/.*: *"\([^"]*\)".*/\1/')
  echo "   Current version: $CURRENT_VERSION"
fi

# Checkout framework files from upstream
echo "📦 Updating framework files..."
git checkout upstream/$UPSTREAM_BRANCH -- \
  src/_framework/ \
  tailwind.config.js \
  vite.config.js \
  postcss.config.js \
  jsconfig.json \
  boilerplate-version.json \
  .cursor/rules/ \
  2>/dev/null || true

# Show new version
if [ -f "boilerplate-version.json" ]; then
  NEW_VERSION=$(grep '"version"' boilerplate-version.json | sed 's/.*: *"\([^"]*\)".*/\1/')
  echo "   Updated to version: $NEW_VERSION"
fi

echo ""
echo "✅ Framework updated successfully!"
echo ""
echo "Next steps:"
echo "  1. Review changes with 'git diff --staged'"
echo "  2. Run 'yarn install' if dependencies changed"
echo "  3. Test with 'yarn dev'"
echo "  4. Commit when ready"
echo ""
echo "⚠️  Your prototypes in src/prototypes/ were NOT modified."

