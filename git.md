# Git 使い方

## コマンド

### git checkout
  - ブランチ切り替え
  - -bをつけると、ブランチ作成と同時に切り替え可能

### git branch
  - ブランチ作成

### git lol（alias登録）
- `git config --global alias.lol "log --graph --decorate --pretty=oneline --abbrev-commit --all"`

### diff 出力
- `git diff [prev commit no] [next commit no] > ./hoge.diff`
### diff ファイル名のみ
- `git diff [prev commit no] [next commit no] --name-only`