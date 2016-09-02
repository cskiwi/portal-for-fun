#!/bin/bash
echo "Deploying!"
cd Web
firebase deploy --token $FIREBASE_TOKEN