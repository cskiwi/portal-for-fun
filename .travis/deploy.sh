#!/bin/bash
if [ '$TRAVIS_BRANCH' == 'master' ] then
  echo "Deploying!"
  cd Web
  firebase deploy --token $FIREBASE_TOKEN
else
  echo "Succesfull build!"
fi