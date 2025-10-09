## 1. Start from dev

Before working on a new feature, always make sure you’re up to date:
```
git checkout dev
git pull origin dev
```

## 2. Create your feature branch

Name it based on what you’re working on:
```
git checkout -b feature/permanent-contacts
```

Now you do your coding here.
No one else touches this branch except you.

## 3. Add and commit your work

When done:
```
git add .
git commit -m "Add permanent contacts feature"
```

## 4. Push your branch to GitHub
```
git push -u origin feature/permanent-contacts
```

After this, GitHub will detect your new branch and show a banner like:
**"Compare & pull request”**

## 5. Open a Pull Request (PR)

Click that button and create a Pull Request from:
```
base: dev
compare: feature/permanent-contacts
```

Now you can:

- Review the code
- Leave comments
- Approve the merge
- Once everyone’s happy → merge it into dev.

## 6. Once approved and merged
Delete the feature branch both locally and remotely:
```
git branch -d feature/permanent-contacts        # delete local branch
git push origin --delete feature/permanent-contacts  # delete remote branch
```
## 6. Merge approved features into main

When a batch of features in dev is tested and stable:
```
git checkout main
git pull origin main
git merge dev
git push origin main
```


That’s your release to production.