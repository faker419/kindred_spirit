# Pull dev branch and add features

## Step 1: Clone the repository
```
git clone https://github.com/faker419/kindred_spirit.git
cd kindred_spirit
```
## Step 2: Switch to the development branch
```
git checkout dev
```
## Step 3: Install dependencies
```
npm install
```
Only needs to be run after cloning or when new dependencies are added later.

## Step 4: Start the development server
```
npm run dev
```

Runs the app locally so you can test changes.

## Step 5: Pull latest changes before starting new work
**run this every time prior to adding a new feature branch**
```
git checkout dev
git pull origin dev
```

## Step 6: Create a new feature branch
```
git checkout -b feature/your-feature-name
```
Replace your-feature-name with a descriptive name.

## Step 7: Work on your feature

Edit code, add new files, etc.

## Step 8: Stage, commit, and push your feature
```
git add .
git commit -m "Add description of your feature"
git push -u origin feature/your-feature-name
```

if already added the feature then just run 

```
git add .
git commit -m "changes to feature"
git push
```

## Step 9: Open a Pull Request (PR) on GitHub
```
Base branch: dev
Compare branch: feature/your-feature-name
```
Review, comment, approve → merge into dev.

## Step 10: Delete the feature branch (optional)
After merging:
```
git branch -d feature/your-feature-name       # local
git push origin --delete feature/your-feature-name  # remote
```
## Step 11: Update your local dev branch
Whenever dev changes:
```
git checkout dev
git pull origin dev
```

**then its a repeat of step 5**