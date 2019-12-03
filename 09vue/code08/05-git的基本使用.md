# git的基本使用

## git使用前要进行配置

这个命令一个电脑只需要执行一次！
git config  --global user.name fahai
git config  --global user.email fahai@tencent.com


## 使用git管理项目
这个命令一个项目只需要执行一次！
git init

这个命令其实就是在当前项目中创建了一个.git隐藏文件夹，我们所有的代码的版本信息最终都会被存储到这个文件夹里



## 要保存一个新的版本，需要我们手动的添加版本，而git不会自动的保存


git status 

查看当前项目中，所有文件的状态（有没有被git管理，有没有修改）


git add 文件名
让这个文件被git管理起来，


git commit -m "版本描述信息"
将当前项目中的修改内容，形成一个新的版本，保存到版本库中


git log
使用这个命令，我们可以查看，以往提交的历史版本信息

## 回退到指定的版本

git reset --hard 版本号

git reflog 可以查看所有的版本号