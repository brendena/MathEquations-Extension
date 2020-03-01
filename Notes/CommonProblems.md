### auto refresh not working
I was able to fix the problem by hidding the npm folder and increasing my number of filer watchers. 

```bash
#https://stackoverflow.com/questions/29722755/webpack-dev-server-does-not-watch-for-my-file-changes
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

```