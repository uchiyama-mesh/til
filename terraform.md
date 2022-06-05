# terraform
## チュートリアル
- https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/aws-get-started

## コマンド
- `terraform init`
  - .tfファイルで利用しているplugin（aws provider等）のダウンロードを実施
  - .terraformフォルダと.terraform.lock.hclファイルが生成される
- `terraform apply`
  - 環境を作成する
  - terraform.tfstateファイルが生成される
    - 環境のバージョンを記録するファイル
  - terraform.tfstate.backupファイルが生成される
- `terraform destroy`
  - 環境を削除する
- `terraform fmt`
  - ファイル内のスタイルを整形する
- `terraform validate`
  - ファイル内の記述が正常であることを検証する
- `terraform show`
  - terraform.tfstateから現在のリソースの状態を表示する
  - `terraform state list`
    - リソース名のみ表示する

## メモ
- aws-cliを利用するため、credentialは下記のように設定
  - `export AWS_PROFILE={profile_name}`
- 変更した後の流れ
  - fmt
  - validate
  - plan
  - apply