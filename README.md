# nurture

日本大学生専用の時間割管理アプリです。

## リンク
[nurture](https://dev.d2300fs4r3axuy.amplifyapp.com)

## 注意
- dockerが使える環境はご自身でご用意してください。

## 使い方
1. [nurture-api](https://github.com/TakumiHiguchi/Nurture-backendAPI)をdocker-compose up -d します
2. nurture をcloneしましょう
  ```
  $ git clone https://github.com/TakumiHiguchi/nurture.git
  ```

3. ディレクトリに移動しましょう
  ```
  $ cd nurture
  ```

4. dockerちゃんに全てお任せしましょう
  ``` 
  $ docker-compose build
  $ docker-compose run node yarn install
  $ docker-compose up
  ```

5. join [localhost:3000](http://localhost:3000/)