# AMSI-project

Family Business

To get it to work, ensure that you have installed node.js 
https://nodejs.org/en/

Next thing you should do is to download git bash
https://git-scm.com/downloads

For now, the project supports only windows environment.
After succesful installation of node.js and git bash, download this repository and go with git bash terminal emulator to the root of this project.

Then type in:
npm install

After few moments all dependencies should be at theirs place.
Then, to get it started type in:
npm start

After a while there should be printed in the terminal ip address with port, that you should follow in browser in case of starting the project.

There is a option to produce the project in non-browser window, in case of doing it, you should type in:
npm run build

After a while the process should end. Go to the cmd-build directory and double click (really, no console support for now) the .bat file.
There should appear a console and after a while disappear.
After the process completes, you should be able to go to build -> output -> ... -> and double click the .exe file (voila :D)

Git workflow:

#create new feature branch and checkout it
git checkout -b my-feature-branch
  
#make some changes...
  
#add everything to stage for further commit
git add -u
  
#commit changes
git commit -m "[TG-123] Added something really awesome"
  
#push the branch and make a merge request in Github
git push origin my-feature-branch
  
#when merge request is accepted merge changes into master
git checkout master
git pull --rebase --prune #make sure it's the latest code
git checkout my-feature-branch
git rebase origin/master #rebase latest changes on feature branch
git checkout master
git merge my-feature-branch --no-ff
git push origin master # publish your megre
  
#clean up after yourself
git push origin :my-feature-branch #removes remote branch
git branch -D my-feature-branch #removes local branch
